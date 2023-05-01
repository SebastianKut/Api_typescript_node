import * as env from 'dotenv';
// Make sure that .env get loaded before rest of the app
const envVariable = env.config();
if (envVariable.error) {
  console.log('Error loading .env');
  process.exit(1);
}
import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';

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
    console.log(`Server is running at http://localhost:${port}`);
  });
}

setupExpress();

startServer();
