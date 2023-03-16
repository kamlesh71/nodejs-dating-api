import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NotAuthorized } from '@/errors/not-authorized';
import { User } from '@/models/user';

interface JwtPayload {
  id: mongoose.Types.ObjectId;
}

export const requireAuth = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const tokenData = req.headers.authorization?.split(' ');

  try {
    if (tokenData?.length !== 2 || tokenData[0] !== 'Bearer' || !tokenData[1]) {
      throw new Error();
    }

    const result = jwt.verify(tokenData[1], process.env.JWT_KEY) as JwtPayload;

    const user = await User.findById(result.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
  } catch (e) {
    throw new NotAuthorized(
      'You must provide a valid authorization bearer token',
    );
  }

  next();
};
