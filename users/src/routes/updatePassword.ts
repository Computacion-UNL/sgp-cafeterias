import { BadRequestError, NotFoundError } from "@cafetho/shared";
import express, { Request, Response } from "express";
import { RecoveryTokenModel, UserModel } from "../models";

const updatePasswordRouter = express.Router();

updatePasswordRouter.post(
  "/password/update/:token",
  async (req: Request, res: Response) => {
    const { password } = req.body;
    const recoveryToken = await RecoveryTokenModel.findOne({
      token: req.params.token,
    });
    if (!recoveryToken)
      throw new BadRequestError(
        "El enlace de cambio de contraseña no es válido"
      );

    if (recoveryToken.isExpired) {
      await recoveryToken.remove();
      throw new BadRequestError(
        "El enlace de cambio de contraseña ha expirado"
      );
    }

    const user = await UserModel.findById(recoveryToken.user);

    if (!user) {
      await recoveryToken.remove();
      throw new NotFoundError();
    }

    user.set({ password });

    await user.save();
    await recoveryToken.remove();

    res.json({});
  }
);

export { updatePasswordRouter };
