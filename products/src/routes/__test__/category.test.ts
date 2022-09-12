import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("Categoría registrada correctamente", async () => {
  await request(app)
    .post("/api/products/category")
    .set("Cookie", global.signin())
    .send({ name: "Malteadas", description: "Descripcion" })
    .expect(201);
});

it("Recibir error si se registra una categoría con el mismo nombre", async () => {
  const cookie = global.signin();

  await request(app)
    .post("/api/products/category")
    .set("Cookie", cookie)
    .send({ name: "Malteadas", description: "Descripcion" })
    .expect(201);

  await request(app)
    .post("/api/products/category")
    .set("Cookie", cookie)
    .send({ name: "Malteadas", description: "Descripcion" })
    .expect(400);
});

it("Categoría actualizada correctamente", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products/category")
    .set("Cookie", cookie)
    .send({ name: "Malteadas", description: "Descripcion" })
    .expect(201);

  await request(app)
    .put(`/api/products/category/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ name: "Malteadas 2022", description: "Descripcion Nueva" })
    .expect(200);
});

it("Recibir error 404 si se modifica una categoría que no existe", async () => {
  const cookie = global.signin();

  await request(app)
    .put(
      `/api/products/category/${new mongoose.Types.ObjectId().toHexString()}`
    )
    .set("Cookie", cookie)
    .send({ name: "Malteadas 2022", description: "Descripcion Nueva" })
    .expect(404);
});

it("Estado de la categoría actualizada correctamente", async () => {
  const cookie = global.signin();

  const saveResponse = await request(app)
    .post("/api/products/category")
    .set("Cookie", cookie)
    .send({ name: "Malteadas", description: "Descripcion" })
    .expect(201);

  const updateResponse = await request(app)
    .put(`/api/products/category/changeStatus/${saveResponse.body.id}`)
    .set("Cookie", cookie)
    .expect(200);

  expect(saveResponse.body.status).not.toEqual(updateResponse.body.status);
});
