import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

(async function () {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT SECRET not defined");
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.error(err);
  }
})();
app.set("trust proxy", true);

app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Listening for requests on port 8000");
});
