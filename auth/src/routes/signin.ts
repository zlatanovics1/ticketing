import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/v1/signin",
  [
    body("email").isEmail().withMessage("Please enter valid email address"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    res.send({});
  }
);

export { router as signinRouter };
