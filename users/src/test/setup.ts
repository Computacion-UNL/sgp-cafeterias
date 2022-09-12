import { Roles } from "@cafetho/shared";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { RolModel } from "../models";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
  var insertRoles: () => Promise<void>;
}

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

global.signin = () => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    rol: { name: Roles.admin },
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  // Build session object {jwt: MyJWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};

global.insertRoles = async () => {
  const rolesToInsert = Object.values(Roles).map((rol) =>
    new RolModel({ name: rol }).save()
  );

  await Promise.all(rolesToInsert);
};
