import { Router } from 'express';
import * as meController from '@/controllers/profile/me-controller';
import * as updateController from '@/controllers/profile/update-controller';

const router = Router();

router.get('/me', meController.me);
router.patch('/', updateController.validation, updateController.update);

export { router as profileRouter };
