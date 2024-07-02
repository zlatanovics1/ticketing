import express from "express";
import "express-async-errors";

import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();

app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Listening for requests on port 8000");
});