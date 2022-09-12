import {
  authorization,
  PaginateParameters,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { ReceiptModel } from "../models";

const allReceiptRouter = Router();

allReceiptRouter.get(
  "/receipts",
  requireAuth,
  authorization(Permissions["read:receipts"]),
  async (req: Request, res: Response) => {
    const receipt = await ReceiptModel.paginate(
      ...new PaginateParameters(req).get()
    );

    res.json(receipt);
  }
);

export { allReceiptRouter };
