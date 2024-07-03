import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/v1/signin",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password").trim().notEmpty().withMessage("Please provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new BadRequestError("Invalid credentials");

    if (!Password.comparePassword(user.password, password))
      throw new BadRequestError("Invalid credentials");

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET!);

    req.session = {
      jwt: token,
      currentUser: user,
    };
    res.status(200).send({
      status: "success",
      data: user,
    });
  }
);

export { router as signinRouter };
