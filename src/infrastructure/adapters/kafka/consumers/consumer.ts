import { Kafka, Consumer } from 'kafkajs';
import { processLogMessages } from '../../../logging';

const kafka = new Kafka({ brokers: ['localhost:9092'] });
let consumer: Consumer | null = null;

export async function initializeKafkaConsumer(groupId: string): Promise<Consumer> {
  if (!consumer) {
    consumer = kafka.consumer({ groupId });
    await consumer.connect();
    console.log('Kafka consumer connected');
  }
  return consumer;
}

export async function consumeLogs(topic: string): Promise<void> {
  if (!consumer) {
    throw new Error('Consumer is not initialized. Call initializeKafkaConsumer first.');
  }

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const log = JSON.parse(message.value?.toString() || '{}');
      console.log('Processing log:', log);
      await processLogMessages(log);
    },
  });
}

export async function disconnectKafkaConsumer(): Promise<void> {
  if (consumer) {
    await consumer.disconnect();
    console.log('Kafka consumer disconnected');
    consumer = null;
  }
}
