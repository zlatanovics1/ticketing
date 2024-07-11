import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/notAuthorizedError";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.currentUser) throw new NotAuthorizedError();

  next();
}
