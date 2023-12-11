import { User } from "../models/user";
import db from "../database/userData";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwtUtils";
import config from "../../config";

export default class UserService {
  static async register(user: User): Promise<String> {
    if (
      user.username.length < 3 ||
      user.password.length < 3 ||
      user.email.length < 3
    ) {
      throw Error(
        "Username, password and email must be at least 3 characters long"
      );
    }
    if (!user.email.includes("@")) {
      throw Error("Email must contain @");
    }
    // check if email does not contain special characters
    if (user.email.match(/[^a-zA-Z0-9@.]/g)) {
      throw Error("Email must not contain special characters");
    }
    if (user.email.includes(" ")) {
      throw Error("Email must not contain spaces");
    }
    if (user.username.match(/[^a-zA-Z0-9]/g)) {
      throw Error("Username must not contain special characters");
    }
    const emailExists = await db.emailExists(user.email);
    if (emailExists) {
      throw Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 2);
    user.password = hashedPassword; // Replace the plain text password with the hashed one
    try {
      return await db.registerUser(user);
    } catch (e: any) {
      throw Error(e.message);
    }
  }
  static async updateScore(userId: number, score: number): Promise<void> {
    try {
      await db.updateScore(userId, score);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async login(user: User): Promise<String> {
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
      id: foundUser.userId,
      username: foundUser.username,
      email: foundUser.email,
      language_id: foundUser.language_id,
      score: foundUser.score,
    });
    return token;
  }

  static async logout(user: User): Promise<void> {
    return;
  }

  static async getAllUsers(): Promise<User[]> {
    return [];
  }

  static async getUserById(user_id: number): Promise<User> {
    return { username: "username", password: "password", email: "email" };
  }
}
