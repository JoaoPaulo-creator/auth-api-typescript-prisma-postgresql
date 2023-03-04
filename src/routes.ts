import { FastifyInstance } from "fastify";
import createUserController from "./controllers/create-user-controller";
import findUsersController from "./controllers/find-users-controller";

export async function routes(app: FastifyInstance) {
  app.get("/users", findUsersController.findAll);
  app.post("/users", createUserController.store);

  //TODO fix this route
  //app.post("/authenticate", authController.authenticate);
}
