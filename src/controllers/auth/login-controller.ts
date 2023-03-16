import { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotAuthorized } from '@/errors/not-authorized';
import { User } from '@/models/user';
import { Hash } from '@/services/hash';
import { validate } from '@/middlewares/validate';

export const validation = validate([
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').notEmpty().withMessage('Please enter password'),
]);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorized('Invalid credentails');
  }

  const passwordMatched = await Hash.compare(user.password, password as string);

  if (!passwordMatched) {
    throw new NotAuthorized('Invalid credentails');
  }

  const token = user.generateToken();

  return res.send({
    token,
    user,
  });
};
