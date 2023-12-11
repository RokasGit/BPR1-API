import { User } from "../models/user";
import db from "../database/userData";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwtUtils";
import config from "../../config";
import { use } from "../routes/userRoutes";
import { UserResponse } from "../models/userResponse";

export default class UserService {
  static async register(user: User): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(user.password, 2);
    user.password = hashedPassword;
    try {
      return await db.registerUser(user);
    } catch (e: any) {
      throw Error(e.message);
    }
  }
  static async updateScore(user_id: number, score: number): Promise<void> {
    try {
      await db.updateScore(user_id, score);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async login(user: User): Promise<UserResponse> {
    let foundUser;

    try {
      foundUser = await db.loginUser(user.email);
    } catch (e: any) {
      throw new Error(e.message);
    }

    if (!foundUser) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    let token = generateToken({
      user_id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
      language_id: foundUser.language_id,
      score: foundUser.score,
    });
    console.log(foundUser);
    let userResponse = {
      user_id: foundUser.user_id,
      username: foundUser.username,
      email: foundUser.email,
      language_id: foundUser.language_id,
      score: foundUser.score,
      token: token,
    };
    return userResponse;
  }

  static async logout(user: User): Promise<void> {
    return;
  }

  static async getAllUsers(): Promise<UserResponse[]> {
    return await db.getAllUsers();
  }

  static async getUserById(user_id: number): Promise<UserResponse> {
    return await db.getUserById(user_id);
  }
  static async getUserByEmail(email: string): Promise<UserResponse> {
    return await db.getUserByEmail(email);
  }
}
