import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  iat: number;
}

export class AuthMiddleware {
  async authorization(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.code(401).send({ message: "Unauthorized" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
      const data = jwt.verify(token, "secret");
      const { id } = data as ITokenPayload;

      req.userId = id;

      return next();
    } catch (error) {
      return res.code(401).send(error);
    }
  }
}
