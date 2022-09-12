import { Request, Response, Router } from "express";
import { RolModel } from "../models";

const allRolesRouter = Router();

/**
 * @swagger
 * /roles:
 *  get:
 *    summary: Returns a list of roles
 *    tags: [Roles]
 *    responses:
 *      200:
 *        description: the list of roles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Role'
 */
allRolesRouter.get("/", async (req: Request, res: Response) => {
  const roles = await RolModel.find();
  res.json(roles);
});

export { allRolesRouter };
