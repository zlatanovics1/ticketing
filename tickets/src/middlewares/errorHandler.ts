import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      status: `${err.statusCode}`.startsWith("4") ? "fail" : "error",
      data: err.serializeError(),
    });
  }

  res
    .status(500)
    .send({ status: "error", data: [{ message: "Something went wrong" }] });
}
