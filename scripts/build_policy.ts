import { web3 } from "hardhat";
import artifacts from "../artifacts/contracts/Policies.sol/Policies.json";
import {searching} from "./lookup";

async function main() {

    const contract = new web3.eth.Contract(artifacts.abi);
    const [deployer] = await web3.eth.getAccounts();

    // passenger_name: "Mr. Dum Dum",
    // passenger_address: deployer,
    // flight_number: 'AA786',
    // flight_date: '01052024T113300',
    // departure_city: 'DSM',
    // destination_city: 'PHX',
    // policy_status: 1

    const deploy_tx = contract.deploy({
        data: artifacts.bytecode
    });
    const deployment = await deploy_tx.send({
        from: deployer,
        gas: (await deploy_tx.estimateGas()).toString(),
    }).once('transactionHash', (transactionHash) => {
        console.log(`DEPLOYMENT TRANS HASH: ${transactionHash}`);
    });

    const load_method_abi = deployment.methods.loadPolicy(
        deployer,
        "Mr. Dum Dum",
        'AA786',
        '01052024T113300',
        'MSP',
        'PHX',
        1
    ).encodeABI()

    const build_tx = {
        from: deployer,
        to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        data: load_method_abi,
        value: '0',
        gasPrice: "875000000",
    }

    const gas_estimate = await web3.eth.estimateGas(build_tx);
    const tx = Object.assign(build_tx, { gas: gas_estimate.toString() });

    const signedTx = await (web3.eth.accounts.signTransaction(tx, '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'));

    await web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .once("transactionHash", (transactionHash) => {
            console.log(`CONTRACT TRANS HASH: ${transactionHash}`);
        }).then((result) => {
            console.log(`Find on the blockchain at ${result.blockNumber}`);
        });
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});