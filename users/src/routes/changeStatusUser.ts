import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { UserModel } from "../models";

const changeStatusUserRouter = Router();

/**
 * @swagger
 * /changeStatus/:id:
 *  put:
 *    summary: Update user account status
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/id'
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
 *        description: user not found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserNotFound'
 */
changeStatusUserRouter.put(
  "/changeStatus/:id",
  requireAuth,
  authorization(Permissions["changeStatus:users"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundError();
    await user.update({ status: !user.status });
    res.json(user);
  }
);

export { changeStatusUserRouter };
