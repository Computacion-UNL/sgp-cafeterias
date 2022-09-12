import { PaginateParameters } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { CategoryModel } from "../models/Category";

const allCategoriesRouter = Router();

allCategoriesRouter.get("/categories", async (req: Request, res: Response) => {
  const categories = await CategoryModel.paginate(
    ...new PaginateParameters(req).get()
  );
  res.json(categories);
});

export { allCategoriesRouter };
