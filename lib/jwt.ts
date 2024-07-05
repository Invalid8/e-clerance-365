import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export const generateToken = (user: {
  id: string;
  email: string;
  role: string;
}): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1d" });
};

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export const generateVerificationToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET || "", { expiresIn: "1d" });
};
