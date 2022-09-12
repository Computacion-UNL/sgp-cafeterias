import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { EntityModel } from "../models";

const updateUserRouter = Router();

/**
 * @swagger
 * /:id:
 *  put:
 *    summary: Update a user account
 *    tags: [Users]
 *    parameters:
 *      - $ref: '#/components/parameters/id'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserUpdate'
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
updateUserRouter.put(
  `/:id`,
  requireAuth,
  authorization(Permissions["update:users"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const entity = await EntityModel.findById(id);
    if (!entity) throw new NotFoundError();
    entity.set(req.body);
    await entity.save();
    res.json(entity);
  }
);

export { updateUserRouter };
