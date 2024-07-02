import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";

const router = express.Router();

router.post(
  "/api/v1/signup",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError("Email already in use");

    const user = User.build({ email, password });
    await user.save();

    res.status(201).json({
      status: "success",
      data: user,
    });
  }
);

export { router as signupRouter };
