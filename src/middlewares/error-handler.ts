import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/errors/custom-error';

export const errorHandler = (
  error: Error,
  _1: Request,
  res: Response,
  _2: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error.serializeErrors());
  }

  console.log(error);

  return res.status(500).send([{ message: 'Something went wrong!' }]);
};
