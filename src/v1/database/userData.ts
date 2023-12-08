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
      return !!user;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async updateScore(userId: number, score: number): Promise<void> {
    try {
      let old_score = await db("Tickets.user")
        .where({ id: userId })
        .first()
        .select("score");
      if (old_score.score + score >= 0) {
        await db("Tickets.user")
          .where({ id: userId })
          .update({ score: db.raw(`score + ${score}`) });
      } else {
        await db("Tickets.user").where({ id: userId }).update({ score: 0 });
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
}
