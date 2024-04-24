//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Policies {
    // Create network events
    event PolicyEvent(Policy policy);

    //The policy status is a string with two possible values: “purchased” and “claimed”
    enum Status {
        purchased,
        claimed
    }

    //The flight insurance policy should contain the following information:
    // passenger’s name
    // passenger’s Ethereum address
    // flight number
    // flight date: DDMMYYYYTHHMMSS
    // departure city
    // destination city
    // policy status
    struct Policy {
        string passenger_name;
        string flight_number;
        string flight_date;
        string departure_code;
        string destination_code;
        Status policy_status;
    }

    mapping (address => Policy) public AllPolicies;

    function loadPolicy(
        address passenger_address,
        string memory passenger_name,
        string memory flight_number,
        string memory flight_date,
        string memory departure_code,
        string memory destination_code,
        Status policy_status
    ) public returns (bool success) {
        AllPolicies[passenger_address].passenger_name = passenger_name;
        AllPolicies[passenger_address].flight_number = flight_number;
        AllPolicies[passenger_address].flight_date = flight_date;
        AllPolicies[passenger_address].departure_code = departure_code;
        AllPolicies[passenger_address].destination_code = destination_code;
        AllPolicies[passenger_address].policy_status = policy_status;

        emit PolicyEvent(AllPolicies[passenger_address]);

        return true;
    }

    function getPolicy(address passenger_address) public view returns (Policy memory policy) {
        return AllPolicies[passenger_address];
    }
}
