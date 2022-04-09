//a few versions behind prod. Flattened to see how to get ethscan verify and public working
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTDAO is ERC721{
    
    using Strings for uint256;

    //mint variables
    uint public supply;
    uint public maxSupply;
    uint public mintPrice;
    bool public mintLive;

    //token variables
    string public baseURI;
    string public baseExtension = ".json";

    //DAO variables
    address public owner;
    struct Proposal {
        uint id;
        address proposer;
        uint amount;
        string description;
        uint startBlock;
        uint endBlock;
        uint yesVotes;
        uint noVotes;
        bool isLive;
        bool isPassed;
        bool isExecuted;
    }
    mapping (uint => Proposal) public proposals;
    mapping (address => uint) public lastProposal;
    mapping (address => uint[]) public proposerHistory;
    mapping(uint => mapping(address => bool)) public voterHistory;

    uint public totalVotesThreshold;
    uint public voterThreshold = 1;
    uint public proposalThreshold;

    uint public totalProposals;
    uint public proposalsPassed;
    uint public blocksPerDay = 6500;


    constructor(string memory  _name, string memory _symbol, uint _maxSupply, uint _totalVotesThreshold, uint _proposalThreshold) ERC721(_name,  _symbol) {
        maxSupply = _maxSupply;
        owner = msg.sender;
        totalVotesThreshold = _totalVotesThreshold;
        proposalThreshold = _proposalThreshold;
    }

    //events
    event Mint(address indexed _from, uint _id);

    event ProposalCreated(address indexed _from, uint _id);

    event ProposalExecuted(bool _passed, address indexed _to, uint _amount, uint _id);

    event VoteCast(address indexed _from, bool _yes, uint _id);

    event OwnershipTransferred(address indexed _from, address indexed _to);

    //mint
    function mint(uint _mintAmount) public payable {
        require(mintLive, "Mint isn't live");
        require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");
        require(msg.value >= mintPrice * _mintAmount, "insufficient funds");

        uint tokenId;
        for (uint i = 1; i <= _mintAmount; i++) {
            tokenId = supply + 1;
            _safeMint(msg.sender, tokenId);
            supply += 1;
            emit Mint(msg.sender, tokenId);
        }
    }

    function setMint(uint _amount, bool _mintLive) public onlyOwner {
        mintPrice = _amount;
        mintLive = _mintLive;
    }

    //functions for token URIs

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), baseExtension)) : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    //DAO
    modifier onlyOwner() {
        require(msg.sender==owner);
        _;
    }

    function transferOwner(address _newOwner) public onlyOwner{
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    //propose
    function propose (uint _amount, string memory _ipfsHash) public {
        require(balanceOf(msg.sender) >= proposalThreshold, "Use doesn't have enough NFTs to create proposal");
        require(lastProposal[msg.sender] == 0, "Only 1 proposal per user");

        Proposal memory _proposal;

        _proposal.id = totalProposals+1;
        _proposal.proposer = msg.sender;
        _proposal.amount = _amount;
        _proposal.description = _ipfsHash;
        _proposal.startBlock = block.number;
        _proposal.endBlock = block.number + (blocksPerDay*7);
        _proposal.isLive = true;

        proposals[_proposal.id] = _proposal;
        lastProposal[msg.sender] = _proposal.id;
        totalProposals +=1;
        proposerHistory[msg.sender].push(_proposal.id);

        emit ProposalCreated(msg.sender, _proposal.id);

    }
    //settle proposal
    function executeProposal(uint _proposalId) public {
        require(block.number > proposals[_proposalId].endBlock, "Proposal still open");
        require(proposals[_proposalId].isExecuted == false, "Proposal already executed");
        require(proposals[_proposalId].id != 0, "Proposal doesn't exist");

        proposals[_proposalId].isLive = false;
        uint totalVotes = proposals[_proposalId].yesVotes + proposals[_proposalId].noVotes;
        if (totalVotes <= totalVotesThreshold) {
            proposals[_proposalId].isExecuted = true;
            delete lastProposal[msg.sender];
            emit ProposalExecuted(false, owner, 0, _proposalId);
        } else {
            if (proposals[_proposalId].yesVotes > proposals[_proposalId].noVotes) {
                proposals[_proposalId].isPassed = true;
                require(address(this).balance > proposals[_proposalId].amount, "Contract doesn't have enough funds for proposal");
                (bool sent, bytes memory data) = owner.call{value: proposals[_proposalId].amount}("");
                require(sent, "Failed to send Ether");
                proposals[_proposalId].isExecuted = true;
                delete lastProposal[msg.sender];
                emit ProposalExecuted(true, owner, proposals[_proposalId].amount, _proposalId);

            } else {
                proposals[_proposalId].isExecuted = true;
                delete lastProposal[msg.sender];
                emit ProposalExecuted(false, owner, 0, _proposalId);
            }
        }
        
    }

    //vote
    function vote(bool _yes, uint _proposalId) public {
        require(balanceOf(msg.sender) >= voterThreshold, "Use doesn't have enough NFTs to vote");
        require(proposals[_proposalId].isLive, "Proposal is closed");
        require(block.number < proposals[_proposalId].endBlock, "Voting window is closed");
        require(voterHistory[_proposalId][msg.sender] == false, "User already voted");

        if (_yes) {
            proposals[_proposalId].yesVotes +=1;
            emit VoteCast(msg.sender, true, _proposalId);
        } else {
            proposals[_proposalId].noVotes +=1;
            emit VoteCast(msg.sender, false, _proposalId);
        }

        voterHistory[_proposalId][msg.sender] == true;

    }
    
}