import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";
import { UserResponse } from "../models/userResponse";
import UserService from "../services/userService";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST") {
    const bodyData = req.body;

    if (!bodyData || Object.keys(bodyData).length === 0) {
      return res.status(400).json({
        error: {
          code: "invalid_request_body",
          message: "Invalid request body",
          errors: [
            {
              message: "The request body is empty or missing",
              domain: "global",
              reason: "required",
            },
          ],
        },
      });
    }
  }

  next();
};
const validateRegistration = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRequest, validateRegistration };
