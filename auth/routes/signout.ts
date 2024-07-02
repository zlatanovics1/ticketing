import express from "express";

const router = express.Router();

router.post("/api/v1/signout", (req, res) => {
  res.send({});
});

export { router as signoutRouter };
