import { BadRequestError, Roles, validateRequest } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { EntityModel, RolModel, UserModel } from "../models";

const signupRouter = Router();
const validator = [
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("El apellido debe tener al menos 3 caracteres"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("El formato de correo no es correcto"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("La clave debe tener al menos 8 caracteres"),
];
/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Create a client account
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Entity'
 *    responses:
 *      200:
 *        description: json with user info
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Entity'
 *      400:
 *        description: Value exists in database
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ExistField'
 */
signupRouter.post(
  "/signup",
  validator,
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstname, lastname, dni, email, password } = req.body;
    const savedUser = await UserModel.findOne({ email });
    if (savedUser)
      throw new BadRequestError("Dirección de correo registrada", "email");
    const rol = await RolModel.findOne({ name: Roles.client });
    const user = new UserModel({
      email,
      password,
      rol: rol?.id,
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

export { signupRouter };
