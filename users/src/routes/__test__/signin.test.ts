import request from "supertest";
import { app } from "../../app";

it("Recibir error cuando un correo que no existe es proporcionado", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("Recibir un error cuando se proporciona una contraseña incorrecta", async () => {
  await global.insertRoles();

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password123",
      firstname: "Maria",
      lastname: "Encalada",
      dni: "0707031662",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "passwordwrong",
    })
    .expect(400);
});

it("Recibir una cookie cuando se proporciona las credenciales de acceso válidas", async () => {
  await global.insertRoles();

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password123",
      firstname: "Maria",
      lastname: "Encalada",
      dni: "0707031662",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
