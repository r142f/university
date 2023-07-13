// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Storage {
    mapping(address => string) public addr_to_hash;

    function setHash(string memory hash) public {
        addr_to_hash[msg.sender] = hash;
    }

    function getHash() public view returns (string memory) {
        return addr_to_hash[msg.sender];
    }
}
