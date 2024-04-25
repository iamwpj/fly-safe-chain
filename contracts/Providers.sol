//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Policies.sol";

contract Providers {
    // Create network events
    event ProviderEvent(string message, address owner);

    // Simple data
    struct ProviderPolicy {
        string passenger_name;
        string flight_number;
        string flight_date;
        string departure_code;
        string destination_code;
        Policies.Status policy_status;
    }

    mapping (address => ProviderPolicy) public allPolicies;
    address [] public listPolicies;

    // Add policies to the providers' account

    function loadPolicy(
        string memory passenger_name,
        string memory flight_number,
        string memory flight_date,
        string memory departure_code,
        string memory destination_code,
        Policies.Status policy_status
    ) external returns (bool success) {
        address passenger_address = msg.sender;
  
        allPolicies[passenger_address].passenger_name = passenger_name;
        allPolicies[passenger_address].flight_number = flight_number;
        allPolicies[passenger_address].flight_date = flight_date;
        allPolicies[passenger_address].departure_code = departure_code;
        allPolicies[passenger_address].destination_code = destination_code;
        allPolicies[passenger_address].policy_status = policy_status;

        return true;
    }

    function getAllPolicies() public view returns (address [] memory policies) {
        return listPolicies;
    }

}