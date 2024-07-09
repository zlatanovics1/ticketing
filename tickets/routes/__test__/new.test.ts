import request from "supertest";
import { app } from "./../../app";

it("has route handler for ticketing service: /api/tickets", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("only authenticated users can access tickets service", async () => {});

it("returns an error when invalid title is provided", async () => {});

it("returns an error when invalid price is provided", async () => {});

it("creates a new ticket with valid input", async () => {});
