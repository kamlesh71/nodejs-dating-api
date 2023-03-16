import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RequestValidationError } from '@/errors/request-validation-error';

const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    _: express.Response,
    next: express.NextFunction,
  ) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  };
};

export { validate };
