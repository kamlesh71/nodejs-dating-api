export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message = '') {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    errors?: {
      field?: string;
      message: string;
    }[];
  };
}
