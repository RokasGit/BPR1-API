import QuestionService from "../services/questionService";
import { QuestionList } from "../models/questionList";
import { Question } from "../models/question";
import { Request, Response } from "express";

export default class QuestionController {
  static async checkQuestion(req: Request, res: Response) {
    try {
      let question: Question = req.body;
      let user_id: number = parseInt(req.params.user_id);
      question = await QuestionService.checkQuestion(question, user_id);
      res.status(200).json(question);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
}
