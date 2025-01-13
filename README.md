# Log Processing with Kafka

📊📈📡 This project implements a clean and scalable architecture for processing logs using Apache Kafka. It includes layers for producing, consuming, and processing logs, ensuring separation of concerns and maintainability. 🎯🛠️🖇️

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Technologies Used](#technologies-used)

---

## Overview

🚀🌍📜 The system is designed to process logs efficiently using Kafka as the backbone for message streaming. Logs are sent by the producer, consumed by the consumer, processed by a service layer, and optionally stored in a database. 🗃️📥📝

### Key Objectives:
- Decoupled layers for logging.
- Scalability for high-volume log processing.
- Maintainability through clean code practices.

---

## Features

✨🔍🛠️ - **Centralized Logging**: A dedicated log layer to centralize log handling.
- **Kafka Integration**: Robust producer and consumer implementation.
- **Service Layer Processing**: Clear separation of concerns for log processing.
- **Database Storage**: Optional storage of logs in a database. 💾📦🗂️

---

## Architecture

### Layers:

1. **Log Layer**: Centralized interface for log creation and enrichment.
2. **Producer**: Sends log messages to Kafka.
3. **Kafka Topic**: Holds messages for further processing.
4. **Consumer**: Reads log messages from Kafka.
5. **Service Layer**: Processes the log messages.
6. **Repository**: Stores processed logs in a database. 🏗️🔄🔑

---

## Getting Started

### Prerequisites:

🖥️🛠️📦 - Node.js (v16 or later)
- Kafka instance (local or hosted)
- Docker (optional, for Kafka setup)

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kafka-log-processing.git
   cd kafka-log-processing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Kafka (if not already available):
   - Use Docker Compose or a managed service.

4. Configure environment variables in `.env`:
   ```
   KAFKA_BROKERS=localhost:9092
   LOG_TOPIC=logs-topic
   DATABASE_URL=your_database_url
   ```

---

## Usage

### Running the Producer:
```bash
npm run start:producer
```

### Running the Consumer:
```bash
npm run start:consumer
```

### Sending Logs:
Use the log layer to send logs:
```typescript
import { logMessage } from './src/logLayer';

logMessage({
  level: 'info',
  message: 'Application started',
  metadata: { userId: '12345' },
});
```

🌟📨📋

---

## Project Structure

```
src/
├── application/
│   ├── use-cases/
│   │   └── processLogs/
│   │       ├── processLogMessage.ts
│   │       └── index.ts
├── domain/
│   └── models/
│       └── log.ts
├── infrastructure/
│   ├── kafka/
│   │   ├── producer.ts
│   │   ├── consumer.ts
│   │   └── topics.ts
│   └── logging/
│       ├── logLayer.ts
│       └── logger.ts
├── shared/
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── constants/
│       └── logLevels.ts
└── tests/
    └── integration/
```

🔍🗂️📁

---

## Technologies Used

⚙️🖥️🚀 - **Node.js**: Runtime environment.
- **KafkaJS**: Kafka client library for Node.js.
- **TypeScript**: Strongly-typed JavaScript.
- **Zod**: Schema validation.
- **Docker**: Kafka setup. 🐳💻📦

---

Feel free to contribute to this project by submitting issues or pull requests. Happy coding! 💡✨🛠️
