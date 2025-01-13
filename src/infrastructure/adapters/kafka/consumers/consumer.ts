import { Kafka } from "kafkajs"
import { processLogMessages } from "../../../logging"


const kafka = new Kafka({ brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'logs-group' })

async function consumeLogs() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'logs-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const log = JSON.parse(message.value?.toString() || '{}')
            await processLogMessages(log)
        }
    })

}

consumeLogs()
