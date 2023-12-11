import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";
// import "../types/custom.d";
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.user = decodedToken; // Assign decoded user data to the request object
  next();
};

export { authenticateToken };
