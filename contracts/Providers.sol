//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Policies.sol";

contract Providers {
    // Create network events
    event ProviderEvent(string message, address owner);

    // Simple data
    struct ProviderPolicy {
        Policies.Policy policy;
    }

    mapping (address => ProviderPolicy) public allProviderPolicies;
    address [] public listProviderPolicies;

    // Add policies to the providers' account

    function loadPolicy(Policies.Policy memory policy) external returns (bool success) {
        allProviderPolicies[msg.sender].policy = policy;
        listProviderPolicies.push(msg.sender);
        emit ProviderEvent("Loaded policy to providers.",msg.sender);
        return true;
    }

    function getAllPolicies() public view returns (address [] memory allPolicies) {
        return listProviderPolicies;
    }

}