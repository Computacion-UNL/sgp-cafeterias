import { NotFoundError, requireAuth } from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { OrderModel } from "../models";

const oneOrderRouter = Router();

oneOrderRouter.get("/:id", requireAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderModel.findById(id);
  if (!order) throw new NotFoundError();
  res.json(order);
});

export { oneOrderRouter };
