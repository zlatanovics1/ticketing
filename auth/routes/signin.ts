import express from "express";

const router = express.Router();

router.post("/api/v1/signin", (req, res) => {
  res.send({});
});

export { router as signinRouter };
