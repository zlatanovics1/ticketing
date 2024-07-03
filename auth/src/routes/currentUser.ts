import express from "express";
import { currentUser } from "../middlewares/currentUser";

const router = express.Router();

router.post("/api/v1/current_user", currentUser, (req, res) => {
  res.send({ currentUser: req.session?.currentUser || null });
});

export { router as currentUserRouter };
