import { OrderStatus, PayType } from "@cafetho/shared";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

const items = [
  {
    product: new mongoose.Types.ObjectId().toHexString(),
    quantity: 1,
    totalPrice: 6,
    unitPrice: 6,
  },
  {
    product: new mongoose.Types.ObjectId().toHexString(),
    quantity: 2,
    totalPrice: 9,
    unitPrice: 4.5,
  },
];

it("Comprobante de pago registrado correctamente", async () => {
  const cookie = global.signin();

  const orderResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      totalValue: 30,
      table: "1",
      items,
      user: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);

  await request(app)
    .post("/api/orders/receipts")
    .set("Cookie", cookie)
    .send({
      fullName: "Consumidor final",
      dni: "1111111111",
      order: orderResponse.body.id,
      amount: 25,
      type: PayType.cash,
      items,
    })
    .expect(201);
});

it("El estado de la orden se actualiza a Completado despues de registrar el Comprobante de pago", async () => {
  const cookie = global.signin();

  const orderResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      totalValue: 30,
      table: "1",
      items,
      user: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);

  await request(app)
    .post("/api/orders/receipts")
    .set("Cookie", cookie)
    .send({
      fullName: "Consumidor final",
      dni: "1111111111",
      order: orderResponse.body.id,
      amount: 25,
      type: PayType.cash,
      items,
    })
    .expect(201);

  const order = await request(app)
    .get(`/api/orders/${orderResponse.body.id}`)
    .set("Cookie", cookie);

  expect(order.body.status).toEqual(OrderStatus.completed);
});
