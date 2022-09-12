import {
  authorization,
  BadRequestError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { EntityModel, UserModel } from "../models";

const saveUserRouter = Router();

/**
 * @swagger
 * /:
 *  post:
 *    summary: Create a user account
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
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
saveUserRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:users"]),
  async (req: Request, res: Response) => {
    const { firstname, lastname, dni, email, password, rol } = req.body;
    const savedUser = await UserModel.findOne({ email });
    if (savedUser)
      throw new BadRequestError("Dirección de correo registrada", "email");
    const user = new UserModel({
      email,
      password,
      rol,
    });
    const entity = new EntityModel({
      firstname,
      lastname,
      dni,
      principal: true,
      user: user.id,
    });
    user.set({ entity: entity.id });
    await entity.save();
    await user.save();
    res.status(201).json(user);
  }
);

export { saveUserRouter };
