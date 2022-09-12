import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { CategoryModel } from "../models/Category";

const changeStatusCategoryRouter = Router();

changeStatusCategoryRouter.put(
  "/category/changeStatus/:id",
  requireAuth,
  authorization(Permissions["changeStatus:category"]),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    if (!category) throw new NotFoundError();
    category.set({ status: !category.status });
    await category.save();
    res.json(category);
  }
);

export { changeStatusCategoryRouter };
