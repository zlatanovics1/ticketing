import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const currentUser = jwt.verify(req.session.jwt, process.env.JWT_SECRET!);
    req.session.currentUser = currentUser;
  } catch (err) {}

  next();
}
