import { web3 } from "hardhat";
import { globals } from "./globals";
import { policyContract } from "./load_contract_Policies";
import { providerContract } from "./load_contract_Providers";
import { writeFileSync } from 'fs';
import { purchase_accounts } from "../receipts/1199.json";


async function writer(account: string, data: JSON) {
    await writeFileSync(
        `receipts/${account.substring(account.length - 4)}.json`,
        JSON.stringify(data), { flag: "w+" }
    );
}

async function main() {

    const account = globals.account_1;
    const signature = globals.private_key_1;
    const contract = await policyContract(account);
    const provider_contract = await providerContract();

    // Normally this would all be taken as user input
    // Since we are more concerned about demo-ing contract
    // interaction, and I haven't built a frontend --
    // it's simply statically listed.

    const load_method_abi = contract.methods.loadPolicy(
        "Bubba Gump",
        'SW332',
        '03062024T231200',
        'PDX',
        'LAX'
    ).encodeABI()

    const build_tx = {
        from: account,
        to: contract.options.address,
        data: load_method_abi,
        value: web3.utils.toWei('.01', 'ether'),
        gasPrice: globals.gas_price
    }

    const gas_estimate = await web3.eth.estimateGas(build_tx);
    const tx = Object.assign(build_tx, { gas: gas_estimate.toString() });

    const signedTx = await (web3.eth.accounts.signTransaction(tx, signature));

    await web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .once("receipt", function (receipt) {
            var data: JSON = <JSON><unknown>{
                "transaction_hash": receipt.transactionHash,
                "block_hash": receipt.blockHash,
                "block_number": receipt.blockNumber.toString(),
                "contract_address": contract.options.address
            };
            writer(account, <JSON>data);
        })
        .then(function () {
            // Finally let's build an off-chain database for our providers
            purchase_accounts.push(account)
            var data: JSON = <JSON><unknown>{
                "purchase_accounts": purchase_accounts
            }

            writer(globals.provider_account,data)
        });



}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});