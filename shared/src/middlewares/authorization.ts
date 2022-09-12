import { NextFunction, Request, Response } from "express";
import { permissionData } from "../config";
import { NotAuthorizedError } from "../errors";
import { Permissions } from "../types";

export const authorization =
  (permission: Permissions) =>
  (req: Request, res: Response, next: NextFunction) => {
    const foundPermission = permissionData.find(
      (permissionInfo) =>
        permissionInfo.name === permission &&
        permissionInfo.roles.includes(req.currentUser!.rol.name)
    );

    if (!foundPermission) throw new NotAuthorizedError();

    next();
  };
