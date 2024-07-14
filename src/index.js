// import {setupServer} from './server.js';
// import {initMongoConnection } from './db/initMongoCollection.js';

// const bootstrap = async () => {
//   await initMongoConnection ();
//   setupServer();
// };

// bootstrap();

import dotenv from 'dotenv';
import {initMongoConnection} from './db/initMongoCollection.js';
import {setupServer} from './server.js';

dotenv.config();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();