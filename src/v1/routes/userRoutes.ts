import express from "express";
import UserController from "../controllers/userController";
import { authenticateTokenMiddleware } from "../middleware/authorizationMiddleware";
import { validateRegistration } from "../middleware/validationMiddleware";
const router = express.Router();

router.post("/register", validateRegistration, UserController.register);

router.post("/login", UserController.login);

router.post("/logout", authenticateTokenMiddleware, (req, res) => {
  res.send("Logout");
});

router.get("/", authenticateTokenMiddleware, UserController.getAllUsers);

router.get(
  "/:user_id",
  authenticateTokenMiddleware,
  UserController.getUserById
);

export = router;
