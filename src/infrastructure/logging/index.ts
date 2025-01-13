import { LogsContract } from "../../Domain/contract/logger";
import { saveLogToDatabase } from "../repository/logging";

export async function processLogMessages(log: LogsContract) {
  console.log(`Processing log: ${log.level} - ${log.message}`);

  if (log.level === 'error') {
    console.error('Critical error detected. Alerting system!');
  }
  await saveLogToDatabase(log);
}