// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTDAO.sol";

contract FACTORY {

    NFTDAO[] private nftdaos;

    function createNFTDAO(
        string memory _name, 
        string memory _symbol,
        uint _maxSupply, 
        uint _totalVotesThreshold, 
        uint _proposalThreshold) public {
    
        NFTDAO nftdao = new NFTDAO(
            _name, 
            _symbol,
            _maxSupply, 
            _totalVotesThreshold, 
            _proposalThreshold,
            msg.sender
        );
    
        nftdaos.push(nftdao);
}

    function allNFTDAOs() public view returns (NFTDAO[] memory) {
        return nftdaos;
    }
}



