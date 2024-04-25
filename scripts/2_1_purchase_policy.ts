import { web3 } from "hardhat";
import { globals } from "./globals";
import { policyContract } from "./load_contract_Policies";
import { purchase_accounts } from "../receipts/1199.json";
import { writer } from "./load_writer";

async function main() {

    const account = globals.account_2;
    const signature = globals.private_key_2;
    const contract = await policyContract(account);

    // Before buying anything, let's see this wallet's balance.
    console.log(`Wallet balance: ${web3.utils.fromWei((await web3.eth.getBalance(account)),'ether')}`);

    // Normally this would all be taken as user input
    // Since we are more concerned about demo-ing contract
    // interaction, and I haven't built a frontend --
    // it's simply statically listed.

    const load_method_abi = contract.methods.loadPolicy(
        "Angela Martin",
        'JB111',
        '20230416T000000',
        'BOS',
        'IAH'
    ).encodeABI()

    const build_tx = {
        from: account,
        to: contract.options.address,
        data: load_method_abi,
        value: web3.utils.toWei('0.01', 'ether'),
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
            if (!purchase_accounts.includes(account)) {
                purchase_accounts.push(account);
                var data: JSON = <JSON><unknown>{
                    "purchase_accounts": purchase_accounts
                }
                writer(globals.provider_account, data);
            }
        });

        // Show updated balance:
        console.log(`Wallet balance: ${web3.utils.fromWei((await web3.eth.getBalance(account)),'ether')}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});