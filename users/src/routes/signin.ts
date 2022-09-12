import { BadRequestError } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { Password } from "../config/password";
import { UserModel } from "../models";

const signinRouter = Router();

/**
 * @swagger
 * /signin:
 *  post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Account'
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
 *        description: Error logging
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserNotFound'
 */
signinRouter.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new BadRequestError("Credenciales incorrectas");
  const validPassword = await Password.compare(user.password, password);
  if (!validPassword) throw new BadRequestError("Credenciales incorrectas");
  if (!user.status) throw new BadRequestError("Cuenta inactiva");

  const userJWT = jwt.sign(user.toJSON(), process.env.JWT_SECRET!);
  req.session = { jwt: userJWT };
  res.json(user);
});
export { signinRouter };
