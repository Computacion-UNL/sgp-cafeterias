import { authorization, Permissions, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { nanoid } from "nanoid";
import { OrderModel, ProductOrderModel } from "../models";

const saveOrderRouter = Router();

saveOrderRouter.post(
  "/",
  requireAuth,
  authorization(Permissions["save:order"]),
  async (req: Request, res: Response) => {
    const { totalValue, table, items, user } = req.body;

    const order = new OrderModel({
      code: nanoid(6),
      totalValue,
      table,
      user,
    });
    const productOrder = items.map((item: any) => ({
      ...item,
      order: order.id,
    }));
    await order.save();
    await ProductOrderModel.insertMany(productOrder);
    res.status(201).json(order);
  }
);

export { saveOrderRouter };
