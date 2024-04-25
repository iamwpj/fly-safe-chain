import { writeFileSync } from 'fs';

export async function writer(account: string, data: JSON) {
    await writeFileSync(
        `receipts/${account.substring(account.length - 4)}.json`,
        JSON.stringify(data), { flag: "w+" }
    );
}