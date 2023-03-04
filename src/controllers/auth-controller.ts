import bcrypt from "bcryptjs";
import { z } from "zod";
import { FindUserByEmail } from "../services/find-user-by-email-service";
import { generateToken } from "../utils/generate-token";

const find = new FindUserByEmail();

class AuthController {
  async authenticate(request, reply) {
    const payloadProps = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = payloadProps.parse(request.body);
    const user = await find.findUserByEmail(email);

    try {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return reply.code(401).send({ error: "Password is invalid" });
      }

      return reply.code(200).send({
        user: {
          id: user.id,
          email: user.email,
        },
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
