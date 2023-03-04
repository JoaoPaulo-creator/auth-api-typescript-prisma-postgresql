import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FindUserByEmail } from "../services/find-user-by-email-service";

const find = new FindUserByEmail();

class AuthController {
  async authenticate(request, reply) {
    const { email, password } = request.body;
    const user = await find.findUserByEmail(email);

    try {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return reply.code(401).send();
      }

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
      return reply.send({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
