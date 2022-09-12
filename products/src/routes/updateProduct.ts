import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { cloudDestroy, cloudUpload } from "../config/cloudinary";
import { upload } from "../config/multer";
import { ProductUpdatedPublisher } from "../events";
import { ProductModel } from "../models/Product";
import { natsWrapper } from "../nats-wrapper";

const updateProductRouter = Router();

updateProductRouter.put(
  `/:id`,
  requireAuth,
  authorization(Permissions["update:products"]),
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, description, price } = req.body;
    const product = await ProductModel.findById(id);
    if (!product) throw new NotFoundError();
    const photo = req.file;
    if (photo) {
      const uploadPhoto = await cloudUpload(photo.path, "products");
      await cloudDestroy(product.publicIdPhoto);
      product.set({
        publicIdPhoto: uploadPhoto.public_id,
        urlPhoto: uploadPhoto.secure_url,
      });
    }
    product.set({ name, description, price });
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

export { updateProductRouter };
