import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(args: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await Password.hashPassword(this.password);
  }
  next();
});

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
