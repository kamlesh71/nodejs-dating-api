import { CustomError } from './custom-error';

export class NotAuthorized extends CustomError {
  statusCode = 401;

  constructor(public message: string = 'Not authorised') {
    super(message);
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
    };
  }
}
