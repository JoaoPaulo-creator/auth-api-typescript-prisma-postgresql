import { prisma } from "../lib/prisma-client";

export class FindUserByEmail {
  async findUserByEmail(email: string) {
    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userEmail) {
      throw Error("Email not found");
    }

    return userEmail;
  }
}
