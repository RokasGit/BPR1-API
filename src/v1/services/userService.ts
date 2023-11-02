import { User } from "../models/user";
import db from "../database/user";
import bcrypt from 'bcrypt';

export default class UserService {
  static async register(user: User): Promise<User> {
    if (user.username.length < 3 || user.password.length < 3 || user.email.length < 3) {
      throw Error(
        "Username, password and email must be at least 3 characters long"
      );
    }
    if (!user.email.includes("@")) {
      throw Error("Email must contain @");
    }
    if (user.username.includes(" ")) {
      throw Error("Username must not contain spaces");
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

    return await db.registerUser(user);
  }

  static async login(user: User): Promise<string> {
    return "token";
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
