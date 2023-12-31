import { Question } from "../models/question";
import QuestionData from "../database/questionData";
import { QuestionReport } from "../models/questionReport";

export default class QuestionService {
  static async updateQuestionStatus(
    question_id: number,
    user_id: number,
    status: string
  ): Promise<void> {
    try {
      await QuestionData.updateQuestionStatus(question_id, user_id, status);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async checkQuestion(
    question: Question,
    user_id: number
  ): Promise<Question> {
    try {
      if (question.answers != null) {
        let correct_selected = 0;

        for (const answer of question.answers) {
          if (
            answer.is_correct === true &&
            correct_selected >= 0 &&
            answer.selected === true
          ) {
            correct_selected++;
          } else if (answer.is_correct === false && answer.selected === true) {
            correct_selected = -1;
            await QuestionService.updateQuestionStatus(
              question.question_id,
              user_id,
              "incorrect"
            );
          }
        }

        if (correct_selected > 0) {
          await QuestionService.updateQuestionStatus(
            question.question_id,
            user_id,
            "correct"
          );
          question.status = "correct";
        }
      }
      return question;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async reportQuestion(questionReport: QuestionReport): Promise<void> {
    try {
      await QuestionData.reportQuestion(questionReport);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
