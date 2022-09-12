import { PaginateParameters, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { AddressModel } from "../models";

const allAddressRouter = Router();
/**
 * @swagger
 * /address:
 *  get:
 *    summary: Returns a list of addresses
 *    tags: [Address]
 *    responses:
 *      200:
 *        description: the list of addresses
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Address'
 */
allAddressRouter.get("/", requireAuth, async (req: Request, res: Response) => {
  const addresses = await AddressModel.paginate(
    ...new PaginateParameters(req).get()
  );
  res.json(addresses);
});

export { allAddressRouter };
