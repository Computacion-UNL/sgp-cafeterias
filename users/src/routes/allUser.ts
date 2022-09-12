import {
  authorization,
  PaginateParameters,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { UserModel } from "../models";

const allUserRouter = Router();

/**
 * @swagger
 * /:
 *  get:
 *    summary: Returns a list of users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: the list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
allUserRouter.get(
  "/",
  requireAuth,
  authorization(Permissions["read:users"]),
  async (req: Request, res: Response) => {
    const users = await UserModel.paginate(
      ...new PaginateParameters(req).get()
    );
    res.json(users);
  }
);

export { allUserRouter };
