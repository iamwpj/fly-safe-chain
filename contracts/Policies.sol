//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Policies {
    // Create network events
    event PolicyEvent(string message, address owner);

    struct Policy {
        string passenger_name;
        string flight_number;
        string flight_date;
        string departure_code;
        string destination_code;
        string policy_status;
    }

    mapping(address => Policy) public allPolicies;
    // address[] public listPolicies;

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
        string memory policy_status = "purchased";

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

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function payout(address payable _payer) public payable costs(10e15) {
        bool sent = _payer.send(msg.value);
        require(sent, "Failed to send Ether");
        
        allPolicies[msg.sender].policy_status = "claimed";
    }

    function getPolicy(address passenger_address) public view returns (Policy memory policy) {
        policy = allPolicies[passenger_address];
    }

    function infoPolicy() public pure returns (string memory information) {
        string
            memory info_message = "View the Fly Safe Chain Policies:\n\
            Premium: 0.01 E\n\
            Indemity: 0.02 E\n\n\
            Coverage Options include, but are not limited to (or by):\n\
             - Weather\n\
             - Unforseeable airspace interruptions\n\
             - Other things\n";

        return info_message;
    }
}
