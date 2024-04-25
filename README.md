# Fly Safe Chain

_All the advantages of regular flying, but with less money in your wallet now!_

# Function

Users can create a policy by utilizing a smart contract on a block chain. The policy data is stored on the chain and accessed by providers to approve and return claims. Contracts are structured with required passenger addresses, flights, etc. This system can be fully automated to provide instant[^1] policy purchase approvals.

## Premiums and Indemnities

* Regular premium: 0.01 E
* Regular indemnity: 0.02 E

# Background

This is for a class and isn't fully featured.

* There's no interface
* Most data is hardcoded for demoing
* Not all functions behave as expected

## Running

This is built on a Hardhat framework and configured to run in a Visual Studio Code devcontainer. You should be set by simply pulling the repository and running it in the devcontainer.

* To compile contracts in the container: `hardhat compile`
* To start a node in the container: `hardhat node` -- the scripts, etc. are configured to use this local node by the settings in [`hardhat.config.ts](./hardhat.config.ts). 
* To run scripts: `hardhat run scripts/<script.ts>`

[^1]: "instant" in the sense that the snails pace of a blockchain is faster than faxing paperwork. Sometimes.
