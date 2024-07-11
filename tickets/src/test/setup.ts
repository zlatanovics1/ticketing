import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();

  mongoose.connect(mongoURI, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  const cookiePayload = JSON.stringify({ jwt: token });

  const cookie = Buffer.from(cookiePayload).toString("base64");

  return [`session=${cookie}`];
};
