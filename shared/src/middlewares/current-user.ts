import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Roles } from "../types";

interface UserPayload {
  updatedAt: string;
  createdAt: string;
  email: string;
  status: boolean;
  rol: {
    name: Roles;
    id: string;
  };
  entity: {
    name: string;
    lastname: string;
    dni: string;
  };
  id: string;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
