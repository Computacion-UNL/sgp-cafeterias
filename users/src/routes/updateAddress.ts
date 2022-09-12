import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { AddressModel, EntityModel } from "../models";

const updateRouter = Router();

updateRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:address"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const entity = await EntityModel.findById(id);
    if (!entity) throw new NotFoundError();

    if (entity.address) {
      const address = await AddressModel.findById(entity.address);
      if (!address) throw new NotFoundError();
      address.set(req.body);
      await address.save();
    } else {
      const newAddress = new AddressModel(req.body);
      entity.set({ address: newAddress.id });
      await newAddress.save();
    }

    entity.set(req.body);
    await entity.save();
    res.json(entity);
  }
);

export { updateRouter };
