import request from "supertest";
import { app } from "./../../app";

it("has route handler for creating tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("only authenticated users can create a ticket", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns an error when invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);
});

it("returns an error when invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "New title", price: -10 })
    .expect(400);
});

it("creates a new ticket with valid input", async () => {});
