import { Express } from 'express';
import { signupRouter } from './signup';

const registerRoutes = (app: Express) => {
  app.use(signupRouter);
};

export { registerRoutes };
