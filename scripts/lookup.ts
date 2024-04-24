import { web3 } from "hardhat";
import artifacts from "../artifacts/contracts/Policies.sol/Policies.json";

export function searching(owner_address: any, contract_address: any) {

    
    const contract = new web3.eth.Contract(artifacts.abi, contract_address);
    const result = contract.methods.getPolicy(owner_address).call();

    return result;
}