// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    address payable public owner;

    event Withdraw(uint amount, address indexed recipient);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withdraw(uint amount) external {
        require(msg.sender == owner, "Unauthorized");
        require(address(this).balance >= amount, "Insufficient balance");
        
        payable(msg.sender).transfer(amount);
        emit Withdraw(amount, msg.sender);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
