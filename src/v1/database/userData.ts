import { db } from "./index";
import { User } from "../models/user";

export default class UserData {
  static async registerUser(user: User): Promise<String> {
    try {
      const [insertedId] = await db("Tickets.user").insert({
        username: user.username,
        password: user.password,
        email: user.email,
        language_id: user.language_id ?? 1,
      });

      const insertedUser = await db("Tickets.user")
        .where({ id: insertedId })
        .first();

      if (!insertedUser) {
        throw new Error("User could not be registered");
      }

      return insertedUser.email;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async emailExists(email: string): Promise<boolean> {
    try {
      const user = await db("Tickets.user").where({ email }).first();
      return !!user; // Converts the user object to a boolean. If user exists, returns true. Otherwise, returns false.
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async loginUser(Email: string): Promise<User> {
    try {
      // Retrieve user by username or email
      return await db("Tickets.user").where({ email: Email }).first();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
