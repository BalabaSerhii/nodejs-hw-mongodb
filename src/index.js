// import {setupServer} from './server.js';
// import {initMongoConnection } from './db/initMongoCollection.js';

// const bootstrap = async () => {
//   await initMongoConnection ();
//   setupServer();
// };

// bootstrap();

// src/index.js
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Ошибка запуска приложения:', error);
    process.exit(1);
  }
};

bootstrap();
