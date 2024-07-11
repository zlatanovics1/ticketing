import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middlewares/requireAuth";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router
  .route("/api/tickets")
  .post(
    requireAuth,
    [
      body("title").trim().notEmpty().withMessage("Ticket must have a title"),
      body("price")
        .isFloat({ gt: 0 })
        .withMessage("Ticket must have a price greater than 0"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {}
  );
