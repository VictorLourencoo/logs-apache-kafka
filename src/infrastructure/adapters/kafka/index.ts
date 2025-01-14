import { Consumer, Producer } from "kafkajs";
import { disconnectKafkaConsumer, initializeKafkaConsumer } from "./consumers/consumer";
import { disconnectKafkaProducer, initializeKafkaProducer } from "./producer/producer";

export interface KafkaContract {
    producer: Producer;
    consumer: Consumer;
    consumeLogs: (topic: string, processMessage: (message: string) => Promise<void>) => Promise<void>;
    sendLog: (topic: string, key: string, value: string) => Promise<void>;
    shutdown: () => Promise<void>;
}

export async function BuildKafka(): Promise<KafkaContract> {
    const producer = await initializeKafkaProducer();
    const consumer = await initializeKafkaConsumer('logs-group');

    return {
        producer,
        consumer,
        async consumeLogs(topic: string, processMessage: (message: string) => Promise<void>) {
            await consumer.subscribe({ topic, fromBeginning: true });
            await consumer.run({
                eachMessage: async ({ message }) => {
                    if (message.value) {
                        await processMessage(message.value.toString());
                    }
                },
            });
        },
        async sendLog(topic: string, key: string, value: string) {
            await producer.send({
                topic,
                messages: [{ key, value }],
            });
        },
        async shutdown() {
            await disconnectKafkaProducer();
            await disconnectKafkaConsumer();
        },
    };
}
