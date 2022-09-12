import {
  authorization,
  NotFoundError,
  Permissions,
  requireAuth,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { OrderModel } from "../models";

const updateOrderRouter = Router();

updateOrderRouter.put(
  "/:id",
  requireAuth,
  authorization(Permissions["update:order"]),
  async (req: Request, res: Response) => {
    const { status } = req.body;
    const id = req.params.id;

    const order = await OrderModel.findById(id);
    if (!order) throw new NotFoundError();

    order.set({ status });
    await order.save();

    res.json(order);
  }
);

export { updateOrderRouter };
