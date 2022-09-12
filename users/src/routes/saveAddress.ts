import { authorization, Permissions, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { AddressModel, EntityModel } from "../models";

const saveRouter = Router();

/**
 * @swagger
 * /address:
 *  post:
 *    summary: Create a client account
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Address'
 *    responses:
 *      200:
 *        description: json with user info
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Address'
 *      400:
 *        description: Value exists in database
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ExistField'
 */
saveRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:address"]),
  async (req: Request, res: Response) => {
    const {
      email,
      phone,
      mainStreet,
      secondaryStreet,
      firstname,
      dni,
      lastname,
      user,
    } = req.body;
    const entity = new EntityModel({ firstname, dni, lastname, user });
    const address = new AddressModel({
      email,
      phone,
      mainStreet,
      secondaryStreet,
    });
    entity.set({ address: address.id });

    await address.save();
    await entity.save();

    res.status(201).json(address);
  }
);

export { saveRouter };
