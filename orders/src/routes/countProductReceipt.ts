import { authorization, Permissions, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { ProductReceiptModel, ReceiptModel } from "../models";

const countProductReceiptRouter = Router();

countProductReceiptRouter.get(
  "/product-receipt/:id",
  requireAuth,
  authorization(Permissions["count:productsReceipts"]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const receipts = await ReceiptModel.find({ order: id }).distinct("_id");
    const productReceipts = await ProductReceiptModel.aggregate([
      { $match: { receipt: { $in: receipts } } },
      {
        $group: {
          _id: "$product",
          quantity: { $sum: "$quantity" },
        },
      },
      { $set: { product: "$_id" } },
      { $project: { _id: 0 } },
    ]);

    res.json(productReceipts);
  }
);

export { countProductReceiptRouter };
