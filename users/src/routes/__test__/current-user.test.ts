import request from "supertest";
import { app } from "../../app";

it("Responder con los detalles del usuario en sesión", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("Responder null cuando no existe un usuario autenticado", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.currentUser).toEqual(null);
});
