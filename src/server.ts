import * as env from 'dotenv';
// Make sure that .env get loaded before rest of the app
const envVariable = env.config();
if (envVariable.error) {
  // We are not using winston logger here because it uses env variable
  console.log('Error loading .env');
  process.exit(1);
}

import 'reflect-metadata'; // this is for typeorm to work properly
import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from './logger';
import { AppDataSource } from './data-source';

const app = express();

function setupExpress() {
  app.route('/').get(root);
}

function startServer() {
  const portArg = process.argv[2],
    portEnv = process.env.PORT;

  let port: number;

  if (isInteger(portEnv)) port = parseInt(portEnv);

  if (!port && isInteger(portArg)) port = parseInt(portArg);

  if (!port) port = 9000;

  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
  });
}

AppDataSource.initialize()
  .then(() => {
    logger.info('The database source has been initialized successfully');
    setupExpress();
    startServer();
  })
  .catch((err) => {
    logger.error('Error initializing database', err);
    process.exit();
  });
