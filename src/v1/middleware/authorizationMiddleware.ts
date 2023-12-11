import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

const authenticateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(403).json({ error: "Invalid token" });
  }

  req.user = decodedToken;
  next();
};

export { authenticateTokenMiddleware };
