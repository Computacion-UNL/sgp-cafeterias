import request from "supertest";
import { app } from "../../app";

it("Recibir error cuando la dirección de correo electrónico ya está registrada", async () => {
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
    .post("/api/users/signup")
    .send({
      email: "test@test.com", // Misma dirección
      password: "password1234",
      firstname: "Maria",
      lastname: "Encalada",
      dni: "1108975489",
    })
    .expect(400);
});

it("Usuario creado con éxito", async () => {
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
});
