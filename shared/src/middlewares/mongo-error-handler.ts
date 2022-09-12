import { NextFunction, Request, Response } from "express";
import { MongoError, MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { CustomMongoError } from "../errors";

export const mongoErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "MongoServerError") {
    const mongoError = getMongoError(new MongoServerError(err));
    next(mongoError);
  }

  if (
    err instanceof MongoError ||
    err instanceof MongooseError.ValidationError
  ) {
    const mongoError = getMongoError(err);
    next(mongoError);
  }

  next(err);
};

const getMongoError = (
  err: MongoError | MongooseError.ValidationError
): CustomMongoError => {
  switch (err.constructor) {
    case MongoServerError: {
      const mongoServerError = err as MongoServerError;
      if (mongoServerError.code === 11000) {
        const field = Object.keys(mongoServerError.keyValue);
        return new CustomMongoError([
          {
            message: `El campo ya se encuentra registrado`,
            field: field[0],
          },
        ]);
      }
    }

    case MongooseError.ValidationError: {
      const mongoValidationError = err as MongooseError.ValidationError;
      let errors = Object.values(mongoValidationError.errors).map((el) => {
        const err = el as MongooseError.CastError;
        return {
          message: "El campo ingresado no es válido",
          field: err.path,
        };
      });
      return new CustomMongoError(errors);
    }
  }

  return new CustomMongoError([{ message: "Ha ocurrido un error inesperado" }]);
};
