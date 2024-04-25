import { web3 } from "hardhat";
import { globals } from "./globals";
import { contract_address } from "../receipts/79C8.json";
import { deployedContract } from "./load_contract_Policies";

async function main() {
    const account = globals.account_1;
    const contract = await deployedContract(contract_address);
    contract.methods.getPolicy(account).call().then(console.log);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});