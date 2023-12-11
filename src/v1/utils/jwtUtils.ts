import jwt from "jsonwebtoken";
import { User } from "../models/user";
import config from "../../config";

const generateToken = (payload: any): string => {
  const token = jwt.sign(payload, config.env.JWT_SECRET || "FullPriceTicket", {
    expiresIn: "2d",
  });
  return token;
};

const verifyToken = (token: string): User | null => {
  try {
    const decoded = jwt.verify(
      token,
      config.env.JWT_SECRET || "FullPriceTicket"
    ) as User;
    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
