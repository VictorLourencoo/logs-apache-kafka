import { LoggerContract } from "../../Domain/logger";
import { saveLogToDatabase } from "../repository/logging";

export async function processLogMessages(log: LoggerContract) {
  console.log(`Processing log: ${log}`);
  await saveLogToDatabase(log);
}