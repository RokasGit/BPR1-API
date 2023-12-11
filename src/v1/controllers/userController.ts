import { Request, Response } from "express";
import userService from "../services/userService";
import { User } from "../models/user";
import { UserResponse } from "../models/userResponse";

export default class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const newUser: UserResponse = await userService.register(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const userResponse: UserResponse | null = await userService.login(user);

      if (!userResponse) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.status(200).json(userResponse);
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const user: User | undefined = req.user as User | undefined;

      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      await userService.logout(user);
      res.status(200).send("Logged out");
    } catch (error) {
      console.error("Error logging out user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users: UserResponse[] = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getUserById(req: Request, res: Response) {
    try {
      const user_id: number = parseInt(req.params.user_id);
      const user: UserResponse | null = await userService.getUserById(user_id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
