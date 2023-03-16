import * as dotEnv from 'dotenv';
dotEnv.config();

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { registerRoutes } from '@/routes';
import { errorHandler } from '@/middlewares/error-handler';
import { NotFoundError } from '@/errors/not-found-error';
import { InternalError } from '@/errors/internal-error';

const app = express();

app.use(json());

registerRoutes(app);

app.all('*', () => {
  throw new NotFoundError();
});

// check env variable is defined
if (!process.env.JWT_KEY) {
  throw new InternalError('JWT_KEY env must be defined');
}

// check mongo url is provided
if (!process.env.MONGO_URL) {
  throw new InternalError('MONGO_URL env must be defined');
}

app.use(errorHandler);

export { app };
