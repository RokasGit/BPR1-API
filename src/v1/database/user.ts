import { db } from '../database/index';
import { User } from "../models/user";
import e from "express";


export default class UserData {
  static async registerUser(
    user: User
  ): Promise<User> {

    try {
      const [insertedId] = await db('Tickets.users').insert({
        username: user.username,
        password: user.password,
        email: user.email
      });

      const insertedUser = await db('Tickets.users').where({ id: insertedId }).first();

      if (!insertedUser) {
        throw new Error("User could not be registered");
      }

      return {
        userId: insertedUser.id,
        username: insertedUser.username,
        email: insertedUser.email,
        password: "********"
      };
    }
    catch (e: any) {
      console.log(e.message);
      throw new Error(e.message);
    }

  }

  static async emailExists(email: string): Promise<boolean> {
    try {
      const user = await db('Tickets.users').where({ email }).first();
      return !!user; // Converts the user object to a boolean. If user exists, returns true. Otherwise, returns false.
    } catch (e: any) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  static async loginUser(Email: string): Promise<User | undefined> {
    try {
      // Retrieve user by username or email
      return await db('Tickets.users')
        .where({ email: Email })
        .first();

    } catch (e: any) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }




}