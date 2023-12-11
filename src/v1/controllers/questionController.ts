import QuestionService from "../services/questionService";
import { QuestionList } from "../models/questionList";
import { Question } from "../models/question";
import { Request, Response } from "express";

export default class QuestionController {
  static async checkQuestion(req: Request, res: Response) {
    try {
      const questionData: Question = req.body;
      const userId: number = parseInt(req.params.user_id);

      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const checkedQuestion = await QuestionService.checkQuestion(
        questionData,
        userId
      );

      if (!checkedQuestion) {
        return res.status(404).json({ error: "Question not found or invalid" });
      }

      res.status(200).json(checkedQuestion);
    } catch (error: any) {
      console.error("Error checking question:", error);
      res.status(500).json({ error: "Failed to check question" });
    }
  }
}
