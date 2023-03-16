import { Router } from 'express';
import * as loginController from '@/controllers/auth/login-controller';
import * as registerController from '@/controllers/auth/register-controller';

const router = Router();

router.post('/signin', loginController.validation, loginController.login);

router.post(
  '/signup',
  registerController.validation,
  registerController.signup,
);

export { router as authRouter };
