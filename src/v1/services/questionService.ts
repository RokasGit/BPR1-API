import { Question } from "../models/question";
import { QuestionList } from "../models/questionList";
import QuestionData from "../database/questionData";

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
}
