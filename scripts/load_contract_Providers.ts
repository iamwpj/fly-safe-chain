import { web3 } from "hardhat";
import artifacts from "../artifacts/contracts/Providers.sol/Providers.json";
import { globals } from "./globals";

export async function providerContract() {
    
    // The provider is loaded with a default
    const account = globals.provider_account;

    // Load the contract ABI.
    const contract = new web3.eth.Contract(artifacts.abi);
    
    // Construct a transaction
    const deploy_tx = contract.deploy({data: artifacts.bytecode});

    // Send it
    const deployment = await deploy_tx.send({
        from: account,
        gas: (await deploy_tx.estimateGas()).toString()
    });

    return deployment;
}

export async function deployedContract(deployed_address: any) {
    const contract = new web3.eth.Contract(artifacts.abi,deployed_address);
    return contract;
}