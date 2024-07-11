import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

app.set("trust proxy", true);

app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);

app.use("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
