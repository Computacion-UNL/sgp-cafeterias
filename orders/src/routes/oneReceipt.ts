import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { createReceiptTemplate, ReceiptTemplateData } from "../helpers";
import { ProductReceiptModel, ReceiptModel } from "../models";

const oneReceiptRouter = Router();

oneReceiptRouter.get(
  "/receipts/:id",
  requireAuth,
  authorization(Permissions["read:receipt"]),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const receipt = await ReceiptModel.findById(id);
    if (!receipt) throw new NotFoundError();

    const productsReceipt = await ProductReceiptModel.find({ receipt });

    // Calling the template render func with dynamic data
    const result = await createReceiptTemplate({
      companyEmail: "cafeterias@email.com",
      companyName: "Cafeterias Loja",
      companyPhone: "09687843548984",
      receipt: receipt as ReceiptTemplateData["receipt"],
      items: productsReceipt as ReceiptTemplateData["items"],
    });

    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
  }
);

export { oneReceiptRouter };
