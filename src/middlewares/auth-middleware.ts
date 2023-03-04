import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  iat: number;
}

export async function authMiddleware(request, reply, next) {
  const { authorization }: any = request.headers;

  if (!authorization) {
    return reply.code(401).send({ message: "Unauthorized" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "secret");
    const { id } = data as ITokenPayload;

    request.userId = id;

    return next;
  } catch (error) {
    return reply.code(401).send(error);
  }
}
