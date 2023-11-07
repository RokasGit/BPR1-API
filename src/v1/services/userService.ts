import { User } from "../models/user";
import db from "../database/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
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

  static async login(user: User): Promise<User> {
    let foundUser;

    try {
      foundUser = await db.loginUser(user.email);
    } catch (e: any) {
      throw new Error(e.message);
    }

    if (!foundUser) {
      throw new Error("User not found");
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    // Asserting that JWT_SECRET is defined or providing a fallback secret
    const JWT_SECRET = config.env.JWT_SECRET || "FullPriceTicket";

    const token = jwt.sign(
      { userId: foundUser.username }, // payload: include user identifying information
      JWT_SECRET // secret key from environment variables
    );

    return {
      username: foundUser.username,
      email: foundUser.email,
      password: "********",
      token: token,
    };
  }

  static async logout(user: User): Promise<void> {
    return;
  }

  static async getAllUsers(): Promise<User[]> {
    return [];
  }

  static async getUserById(id: number): Promise<User> {
    return { username: "username", password: "password", email: "email" };
  }
}
