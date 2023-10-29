import { User } from "../models/user";
export default class UserService {
  static async register(user: User): Promise<User> {
    return user;
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
