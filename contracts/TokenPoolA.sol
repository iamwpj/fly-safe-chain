//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TokenPoolA {
    string public name = "Ownership Token";
    string public symbol = "fsc-own";

    // The amount of customers in this pool.
    uint256 public totalSupply = 10000;

    address public owner;

    mapping(address => uint256) statuses;

    // The Transfer event helps to shift ownership and coverage rate
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * Initialization
     */

    constructor() {
        statuses[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * Transfer Portal
     */

    function transfer(address to, uint256 rate) external {
        require(statuses[msg.sender] >= rate, "Not enough collateral");

        // Trasnfer
        statuses[msg.sender] -= rate;
        statuses[to] += rate;

        emit Transfer(msg.sender, to, rate);
    }

    /**
     * View
     */

    function balanceOf(address account) external view returns (uint256) {
        return statuses[account];
    }
}
