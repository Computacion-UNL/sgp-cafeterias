import { PaginateParameters, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { ProductOrderModel } from "../models";

const allProductOrderRouter = Router();

allProductOrderRouter.get(
  "/item-order",
  requireAuth,
  async (req: Request, res: Response) => {
    const receipt = await ProductOrderModel.paginate(
      ...new PaginateParameters(req).get()
    );
    res.json(receipt);
  }
);

export { allProductOrderRouter };
