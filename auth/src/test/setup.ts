import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

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
