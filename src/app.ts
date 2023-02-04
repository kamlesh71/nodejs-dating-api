import express from 'express';
import 'express-group-routes';
import 'express-async-errors';
import bodyParser from 'body-parser';

import { errorHandler } from '@/middlewares/error-handler';
import { NotFoundError } from '@/errors/not-found-error';
import { registerRoutes } from '@/routes';

const app = express();

app.use(bodyParser.json());

registerRoutes(app);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
