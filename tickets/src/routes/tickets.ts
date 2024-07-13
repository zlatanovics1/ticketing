import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middlewares/requireAuth";
import { validateRequest } from "../middlewares/validateRequest";
import { Ticket } from "../models/ticket";
import { BadRequestError } from "../errors/badRequestError";
import { NotFoundError } from "../errors/notFoundError";

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
    async (req: Request, res: Response) => {
      const { title, price } = req.body;
      const exists = await Ticket.findOne({ title });

      if (exists) throw new BadRequestError("Ticket title already in use");

      const ticket = Ticket.build({ title, price });
      await ticket.save();

      res.status(201).send({
        status: "success",
        data: ticket,
      });
    }
  );

router.route("/api/tickets/:id").get(async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.body.id);
  if (!ticket) throw new NotFoundError();

  res.status(200).send({
    status: "success",
    data: ticket,
  });
});
