import { deployedContract } from "./load_contract_Policies";
import { purchase_accounts } from "../receipts/1199.json";
import { globals } from "./globals";
import { readFile } from "fs";
import { web3 } from "hardhat";


async function main() {
    for (const i in purchase_accounts) {
        const account = purchase_accounts[i];
        const file_name = `receipts/${account.substring(account.length - 4)}.json`;
        readFile(file_name, 'utf-8', (_, data) => {
            const contract_address = JSON.parse(data).contract_address;
            deployedContract(contract_address).then(
                function (contract) {
                    contract.methods.getPolicy(account).call().then(console.log);
                    contract.methods.getBalance().call().then(
                        function (result) {
                            var w: bigint = result
                            console.log(`Balance for ${account}: ${web3.utils.fromWei(w, 'ether')}`)
                        });
                });
        });
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});