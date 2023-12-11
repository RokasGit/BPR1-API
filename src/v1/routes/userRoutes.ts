import express from "express";
import UserController from "../controllers/userController";
import { authenticateToken } from "../middleware/authorizationMiddleware";
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/logout", authenticateToken, (req, res) => {
  res.send("Logout");
});

router.get("/", (req, res) => {
  res.send("Get all users");
});

router.get("/:user_id", (req, res) => {
  res.send("Get user by id");
});

export = router;
