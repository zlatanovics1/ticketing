import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async hashPassword(password: string) {
    const salt = randomBytes(12).toString("hex");
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${hash.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    hashedPassword: string,
    providedPassword: string
  ) {
    const [hash, salt] = hashedPassword.split(".");
    const providedPasswordHash = (await scryptAsync(
      providedPassword,
      salt,
      64
    )) as Buffer;

    return providedPassword === hash;
  }
}
