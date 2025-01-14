import { Kafka, Producer } from 'kafkajs';
import { LoggerContract } from '../../../../Domain/logger';

const kafka = new Kafka({ brokers: ['localhost:9092'] });
let producer: Producer | null = null;

export async function initializeKafkaProducer(): Promise<Producer> {
    if (!producer) {
        producer = kafka.producer();
        await producer.connect();
        console.log('Kafka producer connected');
    }
    return producer;
}

export async function sendLogToKafkaProducer(log: LoggerContract): Promise<void> {
    if (!producer) {
        throw new Error('Producer is not initialized. Call initializeKafkaProducer first.');
    }
    await producer.send({
        topic: 'logs-application-in-production',
        messages: [{ value: JSON.stringify(log) }],
    });
    console.log('Log sent to Kafka:', log);
}

export async function disconnectKafkaProducer(): Promise<void> {
    if (producer) {
        await producer.disconnect();
        console.log('Kafka producer disconnected');
        producer = null;
    }
}
