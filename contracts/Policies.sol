//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Policies {
    // Create network events
    event PolicyEvent(string message, address owner);

    //The policy status is a string with two possible values: “purchased” and “claimed”
    enum Status {
        pending,
        purchased,
        claimed
    }

    struct Policy {
        string passenger_name;
        string flight_number;
        string flight_date;
        string departure_code;
        string destination_code;
        Status policy_status;
    }

    mapping(address => Policy) public allPolicies;
    address[] public listPolicies;

    // Establish payment

    modifier costs(uint _amount) {
        require(msg.value >= _amount, "Not enough Ether provided!");
        _;
    }

    function loadPolicy(
        string memory passenger_name,
        string memory flight_number,
        string memory flight_date,
        string memory departure_code,
        string memory destination_code
    ) public payable costs(10e15) returns (bool success) {
        address passenger_address = msg.sender;
        Status policy_status = Status.purchased;

        allPolicies[passenger_address].passenger_name = passenger_name;
        allPolicies[passenger_address].flight_number = flight_number;
        allPolicies[passenger_address].flight_date = flight_date;
        allPolicies[passenger_address].departure_code = departure_code;
        allPolicies[passenger_address].destination_code = destination_code;
        allPolicies[passenger_address].policy_status = policy_status;

        emit PolicyEvent(
            "New policy requested for a passenger",
            passenger_address
        );
        return true;
    }

    function getPolicy(
        address passenger_address
    )
        public
        view
        returns (
            string memory passenger_name,
            string memory flight_number,
            string memory flight_date,
            string memory departure_code,
            string memory destination_code,
            Status policy_status
        )
    {
        return (
            allPolicies[passenger_address].passenger_name,
            allPolicies[passenger_address].flight_number,
            allPolicies[passenger_address].flight_date,
            allPolicies[passenger_address].departure_code,
            allPolicies[passenger_address].destination_code,
            allPolicies[passenger_address].policy_status
        );
    }

    function infoPolicy() public pure returns (string memory information) {
        string
            memory message = "View the Fly Safe Chain Policies:\n\
            Premium: 0.01 E\n\
            Indemity: 0.02 E\n\n\
            Coverage Options include, but are not limited to (or by):\n\
             - Weather\n\
             - Unforseeable airspace interruptions\n\
             - Other things\n";

        return message;
    }
}
