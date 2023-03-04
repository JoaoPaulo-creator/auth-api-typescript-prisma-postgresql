import { FindAllService } from "../services/get-users-service";
const userService = new FindAllService();

class GetUsersController {
  async findAll(req, res) {
    await userService
      .search()
      .then((response) => {
        return res.code(200).send(response);
      })
      .catch((error) => {
        const { message } = error;
        if (message.includes("empty")) return res.code(404).send({ message });
      });
  }
}

export default new GetUsersController();
