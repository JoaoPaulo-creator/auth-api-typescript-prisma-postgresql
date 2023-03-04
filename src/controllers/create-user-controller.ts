import { UserService } from "../services/create-user-service";
const userService = new UserService();

class CreateUserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    await userService
      .saveUser(name, email, password)
      .then(() => {
        return res.code(201).send({ name, email });
      })
      .catch((error) => {
        const emailExists = "Email alreay exists";
        const { message } = error;
        if (message.includes(emailExists)) {
          return res.code(409).send({ message });
        }

        return res.code(400).send({ message });
      });
  }
}

export default new CreateUserController();
