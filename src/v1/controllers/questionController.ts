import QuestionService from "../services/questionService";
import { QuestionList } from "../models/questionList";
import { Question } from "../models/question";
import { Request, Response } from "express";
import { QuestionReport } from "../models/questionReport";

export default class QuestionController {
  static async checkQuestion(req: Request, res: Response) {
    try {
      const questionData: Question = req.body;
      const user_id: number | undefined = req.user?.user_id;

      if (user_id === undefined || isNaN(user_id) || user_id <= 0) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const checkedQuestion = await QuestionService.checkQuestion(
        questionData,
        user_id
      );

      if (!checkedQuestion) {
        return res.status(404).json({
          error: "Question not found or invalid",
        });
      }

      res.status(200).json(checkedQuestion);
    } catch (error: any) {
      console.error("Error checking question:", error);
      res.status(500).json({
        error: "Failed to check question",
      });
    }
  }
  static async reportQuestion(req: Request, res: Response) {
    try {
      const questionReport: QuestionReport = req.body;
      const user_id: number | undefined = req.user?.user_id;
      if (user_id === undefined || isNaN(user_id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      questionReport.user_id = user_id;
      await QuestionService.reportQuestion(questionReport);
      res.status(201).json({ message: "Question reported" });
    } catch (error: any) {
      console.error("Error reporting question:", error);
      res.status(500).json({
        error: "Failed to report question",
      });
    }
  }
}
