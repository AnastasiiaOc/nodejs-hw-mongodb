// Імпортуйте і викличте у ньому функцію setupServer.
// src/index.js
import { initMongoConnection } from "./db/initMongoConnection"
import { setupServer } from "./server"

const bootstrap = async() => {
    await initMongoConnection();
    setupServer();
}
bootstrap();

// У файлі src/index.js викличте функції initMongoConnection. Переконайтеся, що зʼєднання із базою встановлюється до запуску серверу.