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
        .where("mockexam_id", mockExam_id)
        .first();
      return mockExam;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async checkMockExam(mockExam: MockExam): Promise<void> {
    try {
      await db("Tickets.mockExam").insert({
        user_id: mockExam.user_id,
        percentage: mockExam.percentage,
        completion_date: mockExam.completion_date,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
