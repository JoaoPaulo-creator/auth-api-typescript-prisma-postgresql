import bcrypt from "bcryptjs";

export async function passwordHasher(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}
