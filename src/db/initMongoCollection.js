import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    // const user = env('MONGODB_USER');
    // const pwd = env('MONGODB_PASSWORD');
    // const url = env('MONGODB_URL');
    // const db = env('MONGODB_DB');

    const user = balabaserhii;
    const pwd = K5lUp5bQlB5wl52O;
    const url = cluster0.l5s2aj8.mongodb.net;
    const db = yourDB;

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error connection', e);
    throw e;
  }
};
// import mongoose from 'mongoose';
// import { env } from '../utils/env.js';

// export const initMongoConnection = async () => {
//   try {
//     const user = env('MONGODB_USER');
//     const pwd = env('MONGODB_PASSWORD');
//     const url = env('MONGODB_URL');
//     const db = env('MONGODB_DB');

//     if (!user || !pwd || !url || !db) {
//       throw new Error(
//         'Отсутствуют переменные окружения для подключения к MongoDB',
//       );
//     }

//     const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

//     await mongoose.connect(connectionString, {
//       useNewUrlParser: true, 
//       useUnifiedTopology: true,
//     });

//     console.log('Соединение с Mongo успешно установлено!');
//   } catch (e) {
//     console.error('Ошибка подключения к MongoDB:', e);
//     throw e;
//   }
// };
