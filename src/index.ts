import { buildDependencies } from "./dependecies"
import { BuildServer } from "./infrastructure/app/server"


async function main() {
    const dependencies = await buildDependencies()
    const { LOGGER, KAFKA } = dependencies

    const ENV_VAR = {
        PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
        NODE_ENV: process.env.NODE_ENV || 'development',
    }

    try {
        // Inicializa o servidor
        const SERVER = BuildServer(LOGGER, ENV_VAR)

        SERVER.listen(ENV_VAR.PORT, () => {
            LOGGER.info(`Server running on http://localhost:${ENV_VAR.PORT}`, {
                environment: ENV_VAR.NODE_ENV,
            })
        })

        const logMessage = {
            level: 'info',
            message: 'Application started',
            timestamp: new Date().toISOString(),
        }

        await KAFKA.sendLog('logs-application-in-production', 'log-key', JSON.stringify(logMessage))
        LOGGER.info('Log sent to Kafka', { logMessage })

        await KAFKA.consumeLogs('logs-topic', async (message) => {
            LOGGER.info('Log received from Kafka', { message })
        })
    } catch (error) {
        LOGGER.error('Error during initialization', { error })
        await KAFKA.shutdown()
    }
}

main().catch((error) => {
    console.error('Unhandled error in application startup:', error)
})
