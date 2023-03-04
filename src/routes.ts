import { FastifyInstance } from "fastify";
import authController from "./controllers/auth-controller";
import createUserController from "./controllers/create-user-controller";
import deleteUserController from "./controllers/delete-user.controller";
import findUsersController from "./controllers/find-users-controller";

import { authMiddleware } from "./middlewares/auth-middleware";

export async function routes(app: FastifyInstance) {
  // TODO: fix routes with authMiddleware
  app.get(
    "/users-with-middleware",
    {
      preHandler: [authMiddleware],
    },
    findUsersController.findAll
  );

  app.get("/users", findUsersController.findAll);
  app.post("/users", createUserController.store);
  app.delete("/users/:id", deleteUserController.deleteUserById);
  app.post("/authenticate", authController.authenticate);
}
