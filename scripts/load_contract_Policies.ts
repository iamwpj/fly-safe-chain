import { web3 } from "hardhat";
import artifacts from "../artifacts/contracts/Policies.sol/Policies.json";

export async function policyContract(deployer_address: any) {

    // Load the contract ABI.
    const contract = new web3.eth.Contract(artifacts.abi);
    
    // Construct a transaction
    const deploy_tx = contract.deploy({data: artifacts.bytecode});

    // Send it
    const deployment = await deploy_tx.send({
        from: deployer_address,
        gas: (await deploy_tx.estimateGas()).toString()
    });

    return deployment;
}

export async function deployedContract(deployed_address: any) {
    const contract = new web3.eth.Contract(artifacts.abi,deployed_address);
    return contract;
}