import { OrderStatus } from "@cafetho/shared";
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

it("Orden registrada correctamente", async () => {
  const cookie = global.signin();

  await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      totalValue: 30,
      table: "1",
      items,
      user: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);
});

it("Estado de la orden actualizado correctamente", async () => {
  const cookie = global.signin();

  const saveResponse = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({
      totalValue: 30,
      table: "1",
      items,
      user: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);

  const updateResponse = await request(app)
    .put(`/api/orders/${saveResponse.body.id}`)
    .set("Cookie", cookie)
    .send({ status: OrderStatus.dispatched })
    .expect(200);

  expect(saveResponse.body.status).not.toEqual(updateResponse.body.status);
});

it("Recibir error 404 si se actualiza el estado de una orden que no existe", async () => {
  const cookie = global.signin();

  await request(app)
    .put(`/api/orders/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .send({ status: OrderStatus.dispatched })
    .expect(404);
});
