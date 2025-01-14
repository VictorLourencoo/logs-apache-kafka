import { LoggerContract } from "./Domain/logger"
import { BuildKafka, KafkaContract } from "./infrastructure/adapters/kafka"

export interface Dependencies {
    LOGGER: LoggerContract
    KAFKA: KafkaContract
}


export async function buildDependencies(): Promise<Dependencies> {
    const LOGGER: LoggerContract = {
        info: (message, metadata) => console.log(`INFO: ${message}`, metadata || {}),
        error: (message, metadata) => console.error(`ERROR: ${message}`, metadata || {}),
        debug: (message, metadata) => console.debug(`DEBUG: ${message}`, metadata || {}),
    }

    const KAFKA = await BuildKafka()

    return {
        LOGGER,
        KAFKA,
    }
}
