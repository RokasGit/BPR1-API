import { db } from "./index";
import { User } from "../models/user";
import { UserResponse } from "../models/userResponse";

export default class UserData {
  static async registerUser(user: User): Promise<UserResponse> {
    try {
      const [insertedId] = await db("Tickets.user").insert({
        username: user.username,
        password: user.password,
        email: user.email,
        language_id: user.language_id ?? 1,
      });

      const insertedUser: UserResponse = await db("Tickets.user")
        .where({ user_id: insertedId })
        .select("user_id", "username", "email", "score")
        .first();

      if (!insertedUser) {
        throw new Error("User could not be registered");
      }

      return insertedUser;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async getUserByEmail(email: string): Promise<UserResponse> {
    try {
      const user = await db("Tickets.user")
        .where({ email: email })
        .first()
        .select("user_id", "username", "email", "score");
      return user;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async updateScore(user_id: number, score: number): Promise<void> {
    try {
      let old_score = await db("Tickets.user")
        .where({ user_id: user_id })
        .first()
        .select("score");
      if (old_score.score + score >= 0) {
        await db("Tickets.user")
          .where({ user_id: user_id })
          .update({ score: db.raw(`score + ${score}`) });
      } else {
        await db("Tickets.user")
          .where({ user_id: user_id })
          .update({ score: 0 });
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async loginUser(email: string): Promise<User> {
    try {
      return await db("Tickets.user").where({ email: email }).first();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getAllUsers(): Promise<UserResponse[]> {
    try {
      let users = await db("Tickets.user")
        .select("user_id", "username", "email", "score")
        .orderBy("score", "desc");
      return users;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getUserById(user_id: number): Promise<UserResponse> {
    try {
      let profile = await db("Tickets.user")
        .where({ user_id: user_id })
        .first()
        .select("user_id", "username", "email", "score");
      return profile;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
