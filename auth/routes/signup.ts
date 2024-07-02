import express from "express";

const router = express.Router();

router.post("/api/v1/signup", (req, res) => {
  res.send({});
});

export { router as signupRouter };
