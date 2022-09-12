import { PaginateParameters } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { ProductModel } from "../models/Product";

const allProductsRouter = Router();

allProductsRouter.get("/", async (req: Request, res: Response) => {
  const products = await ProductModel.paginate(
    ...new PaginateParameters(req).get()
  );
  res.json(products);
});

export { allProductsRouter };
