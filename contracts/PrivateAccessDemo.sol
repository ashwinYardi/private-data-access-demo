// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PrivateAccessDemo {
    uint256 private privateVariable;
    uint256 public publicVariable;

    constructor(uint256 privateValue, uint256 publicValue) {
        privateVariable = privateValue;
        publicVariable = publicValue;
    }
}
