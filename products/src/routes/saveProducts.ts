import {
  authorization,
  BadRequestError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { cloudUpload } from "../config/cloudinary";
import { upload } from "../config/multer";
import { ProductCreatedPublisher } from "../events";
import { ProductModel } from "../models/Product";
import { natsWrapper } from "../nats-wrapper";

const saveProductRouter = Router();

saveProductRouter.post(
  "/",
  //requireAuth,
  //authorization(Permissions["save:products"]),
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body;
    const product = await ProductModel.findOne({ name });
    if (product) throw new BadRequestError("Producto registrado");
    const photo = req.file;
    if (photo) {
      const uploadPhoto = await cloudUpload(photo.path, "products");
      const newProduct = new ProductModel({
        name,
        price,
        urlPhoto: uploadPhoto.secure_url,
        publicIdPhoto: uploadPhoto.public_id,
        description,
        category,
      });
      await newProduct.save();
      new ProductCreatedPublisher(natsWrapper.client).publish({
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        urlPhoto: newProduct.urlPhoto,
        publicIdPhoto: newProduct.publicIdPhoto,
        description: newProduct.description,
        status: newProduct.status,
        version: newProduct.version,
      });
      res.status(201).json(newProduct);
    } else {
      throw new BadRequestError("Se requiere una imagen del producto", "photo");
    }
  }
);

export { saveProductRouter };
