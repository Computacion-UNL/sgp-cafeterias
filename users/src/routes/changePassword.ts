import { BadRequestError, NotFoundError, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { Password } from "../config/password";
import { UserModel } from "../models";

const changePasswordRouter = Router();

/**
 * @swagger
 * /change-pass/:id:
 *  put:
 *    summary: Update user account password
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/id'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                description: user account password
 *            example:
 *              password: mypassword123
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
 *        description: invalid password
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserNotFound'
 */
changePasswordRouter.put(
  "/change-pass/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { password } = req.body;
    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundError();
    const equalsPassword = await Password.compare(user.password, password);
    if (equalsPassword)
      throw new BadRequestError("No se puede usar esa contraseña");
    user.set({ password });
    await user.save();
    res.json();
  }
);

export { changePasswordRouter };
