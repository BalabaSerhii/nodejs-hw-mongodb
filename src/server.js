import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'No contacts found!',
    });
  });

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT', '3000'));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

///////////////////////////////////////////////////////
// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import contactsRouter from './routers/contacts.js';
// import { errorHandler } from './middlewares/errorHandler.js';
// import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import { env } from './utils/env.js';

// const PORT = Number(env('PORT', '3000'));

// export const setupServer = () => {
//   const app = express();

//   app.use(
//     express.json({
//       type: ['application/json', 'application/vnd.api+json'],
//       limit: '100kb',
//     }),
//   );

//   app.use(cors());

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

//   app.get('/', (req, res) => {
//     res.json({
//       message: 'No contacts!',
//     });
//   });

//   app.use('/contacts', contactsRouter);

//   app.use('*', notFoundHandler);

//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
//////////////////////////////////////////////////////////////

// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import contactsRouter from './routers/contacts.js';

// import { errorHandler } from './middlewares/errorHandler.js';
// import { notFoundHandler } from './middlewares/notFoundHandler.js';

// import { env } from './utils/env.js';

// const PORT = Number(env('PORT', '3000'));

// export const setupServer = () => {
//   const app = express();

//   app.use(
//     express.json({
//       type: ['application/json', 'application/vnd.api+json'],
//       limit: '100kb',
//     }),
//   );

//   app.use(cors());

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

//   app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello world!',
//     });
//   });

//   app.use(contactsRouter);

//   app.use('*', notFoundHandler);

//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
