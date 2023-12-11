import express from "express";
import UserController from "../controllers/userController";
import { authenticateToken } from "../middleware/authorizationMiddleware";
import { validateRegistration } from "../middleware/validationMiddleware";
const router = express.Router();

router.post("/register", validateRegistration, UserController.register);

router.post("/login", UserController.login);

router.post("/logout", authenticateToken, (req, res) => {
  res.send("Logout");
});

router.get("/", authenticateToken, UserController.getAllUsers);

router.get("/:user_id", authenticateToken, UserController.getUserById);

export = router;
