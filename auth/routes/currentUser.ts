import express from "express";

const router = express.Router();

router.post("/api/v1/current_user", (req, res) => {
  res.send({});
});

export { router as currentUserRouter };
