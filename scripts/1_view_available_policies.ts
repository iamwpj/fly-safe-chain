import { globals } from "./globals";
import { policyContract } from "./load_contract_Policies";


async function main() {

    // Request
    // Account holder #14 requests to see the policy rates
    const account = globals.account_0;
    const contract = await policyContract(account);

    const result = await contract.methods.infoPolicy().call();
    console.log(result)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});