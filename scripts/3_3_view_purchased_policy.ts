import { globals } from "./globals";
import { contract_address } from "../receipts/b906.json";
import { deployedContract } from "./load_contract_Policies";
import { dates } from "../data/weather.json"

async function condition_cancel(condition:string) {
    if (condition == 'hail') {
        return true;
    } else if (condition == 'flood') {
        return true;
    } 

    return false;
}

async function main() {

    const account = globals.account_3;
    const signature = globals.private_key_3;
    const contract = await deployedContract(contract_address);

    const policy: any = JSON.parse(JSON.stringify(await contract.methods.getPolicy(account).call()));

    console.log(
        policy.passenger_name,
        policy.flight_number,
        policy.flight_date,
        policy.departure_code,
        policy.destination_code,
        policy.policy_status
    )

    // Perform verification for weather risks!

    const data = JSON.parse(JSON.stringify(dates));
    const flight_date: string = `${policy.flight_date.substring(0,8)}T000000`;
    
    if (data.hasOwnProperty(flight_date)) {
        if (data[flight_date].hasOwnProperty(policy.departure_code)) {
            var condition = data[flight_date][policy.departure_code];
            console.log(`Departing city of ${policy.departure_code} has ${condition} conditions.`)
            console.log(`Cancelling flight? ${await condition_cancel(condition)}`)

            

        } else if (data[flight_date].hasOwnProperty(policy.destination_code)) {
            var condition = data[flight_date][policy.destination_code];
            console.log(`Destination city of ${policy.destination_code} has ${condition} conditions.`)
            console.log(`Cancelling flight? ${await condition_cancel(condition)}`)

        } else {
            console.log('There is no weather in either your cities today.')
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});