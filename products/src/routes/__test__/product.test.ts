import mongoose from "mongoose";
import path from "path";
import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

const productPhotoPath = path.join(
  __dirname,
  "..",
  "..",
  "__mocks__",
  "product.jpg"
);

it("Producto registrado correctamente", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(201);
});

it("Recibir error si se registra un producto con el mismo nombre", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(201);

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "20")
    .field("description", "Descripcion distinta")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(400);
});

it("Se publica el evento de crear producto", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("Producto actualizado correctamente", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(201);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .field("name", "Malteada Nueva 1")
    .field("description", "Nueva Descripcion")
    .field("price", "5")
    .expect(200);
});

it("Recibir error 404 si se modifica un producto que no existe", async () => {
  const cookie = global.signin();

  await request(app)
    .put(`/api/products/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", cookie)
    .field("name", "Malteada Nueva 1")
    .field("description", "Nueva Descripcion")
    .field("price", "5")
    .expect(404);
});

it("Se publica el evento de modificar producto", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString());

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .field("name", "Malteada Nueva 1")
    .field("description", "Nueva Descripcion")
    .field("price", "5")
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("Estado del producto actualizado correctamente", async () => {
  const cookie = global.signin();

  const saveResponse = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .attach("photo", productPhotoPath)
    .field("name", "Malteada")
    .field("price", "10")
    .field("description", "Descripcion")
    .field("category", new mongoose.Types.ObjectId().toHexString())
    .expect(201);

  const updateResponse = await request(app)
    .put(`/api/products/changeStatus/${saveResponse.body.id}`)
    .set("Cookie", cookie)
    .expect(200);

  expect(saveResponse.body.status).not.toEqual(updateResponse.body.status);
});
