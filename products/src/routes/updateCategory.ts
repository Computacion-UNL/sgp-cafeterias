import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { CategoryModel } from "../models/Category";

const updateCategoryRouter = Router();

updateCategoryRouter.put(
  `/category/:id`,
  requireAuth,
  authorization(Permissions["update:category"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const category = await CategoryModel.findById(id);
    if (!category) throw new NotFoundError();
    category.set({ name, description });
    await category.save();
    res.json(category);
  }
);

export { updateCategoryRouter };
