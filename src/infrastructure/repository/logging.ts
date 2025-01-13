import { LogsContract } from "../../Domain/contract/logger";

export async function saveLogToDatabase(log: LogsContract) {
    console.log(`Saving log to database: ${JSON.stringify(log)}`);

}