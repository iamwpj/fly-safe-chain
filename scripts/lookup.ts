import { web3 } from "hardhat";
import { globals } from "./globals";
import artifacts from "../artifacts/contracts/Policies.sol/Policies.json";

export function searching() {

    const contract_address = globals.deployment_address;
    const owner_address = globals.account_0;
    const contract = new web3.eth.Contract(artifacts.abi, contract_address);
    const result = (contract.methods.infoPolicy()).call();

    console.log(result);
}

searching();