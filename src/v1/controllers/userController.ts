import { Request, Response } from "express";
import userService from "../services/userService";
import QuestionService from "../services/questionService";
import { User } from "../models/user";

export default class UserController {
  static async register(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const newUser = await userService.register(user);
      // const questions = await QuestionService.getExam();
      // console.log(questions);
      res.status(201).send(newUser);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const user: User = req.body;
      const token = await userService.login(user);
      res.status(200).send(token);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const user: User = req.body;
      await userService.logout(user);
      res.status(200).send("Logged out");
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUserById(id);
      res.status(200).send(user);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
}
