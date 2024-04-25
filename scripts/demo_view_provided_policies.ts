import { deployedContract } from "./load_contract_Policies";
import { purchase_accounts } from "../receipts/1199.json";
import { readFile } from "fs";

async function main() {

    purchase_accounts.forEach(function (account) {
        const file_name = `receipts/${account.substring(account.length - 4)}.json`;
        readFile(file_name, 'utf-8', (_, data) => {
            const contract_address = JSON.parse(data).contract_address;
            deployedContract(contract_address).then(
                function (contract) {
                    contract.methods.getPolicy(account).call().then(console.log);
                });
        });
    });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});