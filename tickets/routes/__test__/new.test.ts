import request from "supertest";
import { app } from "./../../app";

it("has route handler for ticketing service: /api/tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});
