import { Kafka } from 'kafkajs'
import { LogsContract } from '../../../../Domain/contract/logger'


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
