import { LoggerContract } from "../../Domain/logger";

export async function saveLogToDatabase(log: LoggerContract) {
    console.log(`Saving log to database: ${JSON.stringify(log)}`);

}