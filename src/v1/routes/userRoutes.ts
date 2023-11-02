import express from "express";
import UserController from "../controllers/userController";
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/logout", (req, res) => {
  res.send("Logout");
});

router.get("/", (req, res) => {
  res.send("Get all users");
});

router.get("/:id", (req, res) => {
  res.send("Get user by id");
});

export = router;
