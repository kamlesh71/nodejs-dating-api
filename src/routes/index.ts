import { Express, Router } from 'express';
import { authRouter } from './auth';
import { profileRouter } from './profile';
import { URL_BASE_V1 } from '@/constants/path';
import { requireAuth } from '@/middlewares/require-auth';

const registerRoutes = (app: Express) => {
  const router = Router();

  // guest routes
  router.use('/auth', authRouter);

  router.use('/profile', requireAuth, profileRouter);

  app.use(URL_BASE_V1, router);
};

export { registerRoutes };
