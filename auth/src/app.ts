import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

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

export { app };
