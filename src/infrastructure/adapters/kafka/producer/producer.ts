import { Kafka } from 'kafkajs'

interface LogsContract {
    level: string
    message: string
    metadata?: Record<string, any>
}

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

export async function sendLogToKafkaProducer(log: LogsContract) {
    await producer.connect()
    await producer.send({
        topic: 'logs application in production',
        messages: [{ value: JSON.stringify(log) }]
    })
    await producer.disconnect();
}
