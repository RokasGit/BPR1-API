import { MockExam } from "../models/mockExam";
import { db } from "./index";

export default class MockExamData {
  static async getMockExamsByUserId(user_id: number): Promise<MockExam[]> {
    try {
      let mockExams = await db("Tickets.mockExam")
        .select()
        .where("user_id", user_id);
      return mockExams;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async getMockExamById(mockExam_id: number): Promise<MockExam> {
    try {
      let mockExam = await db("Tickets.mockExam")
        .select()
        .where("id", mockExam_id);
      return mockExam[0];
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async createMockExam(mockExam: MockExam): Promise<number> {
    try {
      const [insertedId] = await db("Tickets.mockExam").insert({
        user_id: mockExam.user_id,
        percentage: mockExam.percentage,
        completion_date: mockExam.completion_date,
      });

      return insertedId;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
