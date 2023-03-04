import jwt from "jsonwebtoken";
import { secret } from "../../config/auth.json";

// empty object that will be filled with {id: user.id } when called
export function generateToken(params: {}) {
  return jwt.sign(params, secret, { expiresIn: "1d" });
}
