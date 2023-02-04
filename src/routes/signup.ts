import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '@/middlewares/validate-request';
import { API_SIGNUP } from '@/constants/path';
import { User } from '@/models/user';
import { BadRequest } from '@/errors/bad-request-error';

const router = express.Router();

const validationRules = [
  body('firstName').notEmpty().withMessage('Please provide your first name'),
  body('lastName').notEmpty().withMessage('Please provide your last name'),
  body('email').isEmail().withMessage('Email must be valid email address'),
  body('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 to 20 charaters'),
];

router.post(
  API_SIGNUP,
  validationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequest('The email has already been taken.');
    }

    const user = await User.build({
      firstName,
      lastName,
      email,
      password,
    }).save();

    return res.status(201).send(user);
  },
);

export { router as signupRouter };
