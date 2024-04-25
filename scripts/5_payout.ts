import { web3 } from "hardhat";
import { globals } from "./globals";
import { deployedContract } from "./load_contract_Policies";
import { purchase_accounts } from "../receipts/1199.json";
import { contract_address } from "../receipts/b906.json";
import { writer } from "./load_writer";


async function main() {

    const account = globals.account_3;
    const signature = globals.private_key_3;
    const contract = await deployedContract(contract_address);

    // Check our wallet balance first:
    console.log(`Wallet balance: ${web3.utils.fromWei((await web3.eth.getBalance(account)),'ether')}`);
    
    // Now show what is loaded on our smart contract:
    await contract.methods.getBalance().call().then(
        function (result) {
            var w = result
            console.log(`Balance for ${account}: ${web3.utils.fromWei(w, 'ether')}`)
        });

    const load_method_abi = contract.methods.payout(globals.provider_account).encodeABI()
    const build_tx = {
        from: account,
        to: contract_address,
        nonce: `0x${await web3.eth.getTransactionCount(account)}`,
        data: load_method_abi,
        value: web3.utils.toWei('0.02', 'ether'),
        gasPrice: globals.gas_price
    }

    const gas_estimate = await web3.eth.estimateGas(build_tx);
    const tx = Object.assign(build_tx, { gas: gas_estimate.toString() });

    const signedTx = await (web3.eth.accounts.signTransaction(tx, signature));

    await web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .then(function () {
            // Remove from the providers database
            for (let i = 0; i < purchase_accounts.length; i++) {
                if (purchase_accounts[i] == account) {
                    purchase_accounts.splice(i, 1)
                }
            }
            var data: JSON = <JSON><unknown>{
                "purchase_accounts": purchase_accounts
            }
            writer(globals.provider_account, data);
        });

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});