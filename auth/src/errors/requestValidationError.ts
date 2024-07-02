import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super("Bad request");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => ({ message: err.msg }));
  }
}
