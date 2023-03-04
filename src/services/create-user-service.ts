import bcrypt from "bcryptjs";
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

    if (password.length < passwordMinLength) {
      throw new Error(passLengthErrorMessage);
    }

    const hash = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
  }
}
