import { prisma } from "../lib/prisma-client";

export class FindAllService {
  async search() {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      throw Error("Users list is empty");
    }
    return users;
  }
}
