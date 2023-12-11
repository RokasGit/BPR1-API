import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationError } from "express-validator";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST") {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
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
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
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
