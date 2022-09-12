import {
  OrderStatus,
  PaginateParameters,
  requireAuth,
  Roles,
} from "@cafetho/shared";
import { Request, Response, Router } from "express";
import { OrderModel } from "../models";

const allOrderRouter = Router();

allOrderRouter.get("/", requireAuth, async (req: Request, res: Response) => {
  const paginateParameters = new PaginateParameters(req).get();
  const query = paginateParameters[0];
  const options = paginateParameters[1];
  const orderStatusQuery = getOrdersByRole(req.currentUser!.rol.name);

  if (!query.user && !!orderStatusQuery) {
    query.$or = query.$or
      ? [...query.$or, ...orderStatusQuery]
      : orderStatusQuery;
  }

  const orders = await OrderModel.paginate(query, options);
  res.json(orders);
});

const getOrdersByRole = (currentRole: Roles) => {
  switch (currentRole) {
    case Roles.chef:
      return [
        { status: OrderStatus.create },
        { status: OrderStatus.processing },
      ];
    case Roles.waiter:
      return [
        { status: OrderStatus.dispatched },
        { status: OrderStatus.payable },
        { status: OrderStatus.completed },
      ];

    default:
      return undefined;
  }
};

export { allOrderRouter };
