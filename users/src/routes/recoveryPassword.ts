import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@cafetho/shared";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  generateRecoveryToken,
  sendMailRecoveryPassword,
} from "../helpers/utils";
import { RecoveryTokenModel, UserModel } from "../models";

export const recoveryPasswordRouter = express.Router();

const validators = [
  body("email").isEmail().withMessage("El email debe ser válido.").trim(),
];

/**
 * @swagger
 * /:
 *  post:
 *    summary: Recovery password
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RecoveryPass'
 *    responses:
 *      200:
 *        description: json with user info
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: exist email
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/NotFound'
 */
recoveryPasswordRouter.post(
  "/password/recovery",
  validators,
  validateRequest,
  async (req: Request, res: Response) => {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) throw new NotFoundError();

    if (!user.status)
      throw new BadRequestError("Su cuenta no se encuentra activa");

    // Remove recovery token if it exists
    const recoveryToken = await RecoveryTokenModel.findOne({ user: user.id });
    if (recoveryToken) await recoveryToken.remove();

    const newRecoveryToken = generateRecoveryToken(user.id);
    await newRecoveryToken.save();
    sendMailRecoveryPassword(user, newRecoveryToken);

    res.json({});
  }
);
