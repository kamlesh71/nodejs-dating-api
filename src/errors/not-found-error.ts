import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  serializeErrors() {
    return {
      message: 'resource not found',
    };
  }

  constructor() {
    super('resource not found.');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
