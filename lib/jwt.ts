import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export function generateToken(user: { id: string; email: string }) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: "7d" } // token expires in 7 days
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
