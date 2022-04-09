// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PutinPoker is ERC721{
    
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
        uint description;
        uint startTime;
        uint endTime;
        uint yesVotes;
        uint noVotes;
        bool isLive;
        bool isPassed;
        uint proposalType;
    }

    //types == money, owner, voteThreshold

    mapping (uint => Proposal) public proposals;

    uint public voteThreshold;
    uint public totalProposals;
    uint public proposalsPassed;


    constructor(string memory  _name, string memory _symbol, uint _maxSupply, uint _voteThreshold) ERC721(_name,  _symbol) {
        maxSupply = _maxSupply
        owner = msg.sender;
        voteThreshold = _voteThreshold
    }

    //events
    event Mint(address indexed _from, uint _id);

    //mint
    function mint(uint _mintAmount) public payable {
        require(mintLive, "Mint isn't live");
        require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");
        require(msg.value >= mintPrice * _mintAmount, "insufficient funds");

        uint tokenId = supply + 1;
        for (uint i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, tokenId);
            supply += 1;
            emit Mint(msg.sender, tokenId)
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

    //propose
    //vote
    
}