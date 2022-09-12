import request from "supertest";
import { app } from "../../app";

it("Eliminar la cookie de acceso luego de cerrar sesión", async () => {
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
      password: "password123",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/users/logout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
