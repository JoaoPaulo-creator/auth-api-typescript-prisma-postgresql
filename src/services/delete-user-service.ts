import { prisma } from "../lib/prisma-client";

class DeleteUserService {
  async deleteUser(id: string) {
    const userId = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!userId) {
      throw new Error("User not found");
    }

    return userId;
  }
}

export default new DeleteUserService();
