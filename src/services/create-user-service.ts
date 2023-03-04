import crypto from "node:crypto";
import { prisma } from "../lib/prisma-client";

export class UserService {
  async saveUser(name: string, email: string, password: string) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const passwordMinLength = 5;
    const passLengthErrorMessage = `Password must have at leat ${passwordMinLength} characters`;

    if (emailExists) {
      throw new Error("Email alreay exists");
    }

    if (passLengthErrorMessage.length < passwordMinLength) {
      throw new Error(passLengthErrorMessage);
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await crypto
      .pbkdf2Sync(password, salt, 10, 64, "sha512")
      .toString("hex");

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
