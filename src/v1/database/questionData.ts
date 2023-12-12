import { Question } from "../models/question";
import { QuestionList } from "../models/questionList";
import { QuestionReport } from "../models/questionReport";
import { db } from "./index";

export default class QuestionData {
  static async updateQuestionStatus(
    question_id: number,
    user_id: number,
    status: string
  ): Promise<void> {
    try {
      const existingRow = await db("Tickets.questionStatus")
        .where({
          question_id: question_id,
          user_id: user_id,
        })
        .first();
      if (existingRow) {
        await db("Tickets.questionStatus")
          .where({
            question_id: question_id,
            user_id: user_id,
          })
          .update({ status: status });
      } else {
        await db("Tickets.questionStatus").insert({
          question_id: question_id,
          user_id: user_id,
          status: status,
        });
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async reportQuestion(questionReport: QuestionReport): Promise<void> {
    try {
      await db("Tickets.questionReport").insert(questionReport);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
