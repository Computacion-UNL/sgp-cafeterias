import { Express } from "express";
import { allOrderRouter } from "./allOrders";
import { allProductOrderRouter } from "./allProductOrder";
import { allReceiptRouter } from "./allReceipt";
import { countProductReceiptRouter } from "./countProductReceipt";
import { oneOrderRouter } from "./oneOrder";
import { oneReceiptRouter } from "./oneReceipt";
import { saveOrderRouter } from "./saveOrder";
import { saveReceiptRouter } from "./saveReceipt";
import { updateOrderRouter } from "./updateOrder";

const ordersURI = "/api/orders";
export const routes = (app: Express) => {
  //Order Routes
  app.use(ordersURI, allReceiptRouter);
  app.use(ordersURI, allOrderRouter);
  app.use(ordersURI, countProductReceiptRouter);
  app.use(ordersURI, allProductOrderRouter);
  app.use(ordersURI, oneOrderRouter);
  app.use(ordersURI, oneReceiptRouter);
  app.use(ordersURI, saveOrderRouter);
  app.use(ordersURI, saveReceiptRouter);
  app.use(ordersURI, updateOrderRouter);
};
