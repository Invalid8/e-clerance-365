import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const EXPIRES_IN = "1h"; // Token expires in 1 hour

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, SECRET_KEY) as object;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

export function generateVerificationToken(email: string): string {
  const payload = { email };
  return generateToken(payload);
}
