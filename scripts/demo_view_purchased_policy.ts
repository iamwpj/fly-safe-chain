import { globals } from "./globals";
import { contract_address } from "../receipts/79C8.json";
import { deployedContract } from "./load_contract_Policies";

async function main() {

    // Firstly -- we will just look at our purchase.
    const account = globals.account_1;
    const contract = await deployedContract(contract_address);
    contract.methods.getPolicy(account).call().then(console.log);


    // Let's verify the weather.
    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});