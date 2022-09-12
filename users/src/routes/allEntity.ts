import {
  authorization,
  PaginateParameters,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { EntityModel } from "../models";

const allEntityRouter = Router();

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
allEntityRouter.get(
  "/entity",
  requireAuth,
  authorization(Permissions["read:entities"]),
  async (req: Request, res: Response) => {
    const entities = await EntityModel.paginate(
      ...new PaginateParameters(req).get()
    );

    res.json(entities);
  }
);

export { allEntityRouter };
