import jwt from "jsonwebtoken";
import { secret } from "../../config/auth.json";

interface ITokenPayload {
  id: string;
  iat: number;
}

export async function authMiddleware(request, reply, done) {
  const { authorization }: any = request.headers;

  if (!authorization) {
    return reply.code(401).send({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, secret);
    const { id } = data as ITokenPayload;

    request.userId = id;

    return done();
  } catch (error) {
    return reply.code(401).send(error);
  }
}
