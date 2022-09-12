import { CustomError } from "./custom-error";

export class CustomMongoError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: { message: string; field?: string }[]) {
    super("Mongo error");
    Object.setPrototypeOf(this, CustomMongoError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}
