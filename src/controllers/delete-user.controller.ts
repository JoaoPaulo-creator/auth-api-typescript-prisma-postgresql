import deleteUserService from "../services/delete-user-service";

class DeleteUserController {
  async deleteUserById(req, res) {
    const { id } = req.params;
    await deleteUserService
      .deleteUser(id)
      .then(() => {
        return res.code(204).send();
      })
      .catch((error) => {
        return res.code(404).send(error);
      });
  }
}

export default new DeleteUserController();
