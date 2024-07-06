import { app } from "../../app";

import request from "supertest";

it("Returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});
