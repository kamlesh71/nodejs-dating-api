import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 422;

  constructor(private errors: ValidationError[]) {
    super('validation error occured');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      message: 'validation error occured',
      errors: this.errors.map((error) => ({
        field: error.param,
        message: error.msg as string,
      })),
    };
  }
}
