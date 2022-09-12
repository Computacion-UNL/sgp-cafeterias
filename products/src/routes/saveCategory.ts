import {
  authorization,
  BadRequestError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { CategoryModel } from "../models/Category";

const saveCategoryRouter = Router();

saveCategoryRouter.post(
  "/category",
  //requireAuth,
  //authorization(Permissions["save:category"]),
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const category = await CategoryModel.findOne({ name });
    if (category) throw new BadRequestError("Categoría registrada", "name");
    const newCategory = new CategoryModel({
      name,
      description,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  }
);

export { saveCategoryRouter };
