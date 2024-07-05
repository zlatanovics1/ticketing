import mongoose from "mongoose";
import { app } from "./app";

(async function () {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT SECRET not defined");
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.error(err);
  }
})();

app.listen(8000, () => {
  console.log("Listening for requests on port 8000");
});
