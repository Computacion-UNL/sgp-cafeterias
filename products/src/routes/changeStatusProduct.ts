import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { ProductUpdatedPublisher } from "../events";
import { ProductModel } from "../models/Product";
import { natsWrapper } from "../nats-wrapper";

const changeStatusProductRouter = Router();

changeStatusProductRouter.put(
  "/changeStatus/:id",
  requireAuth,
  authorization(Permissions["changeStatus:products"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (!product) throw new NotFoundError();
    product.set({ status: !product.status });
    await product.save();

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name: product.name,
      price: product.price,
      publicIdPhoto: product.publicIdPhoto,
      status: product.status,
      urlPhoto: product.urlPhoto,
      version: product.version,
      description: product.description,
    });

    res.json(product);
  }
);

export { changeStatusProductRouter };
