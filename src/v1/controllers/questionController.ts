import QuestionService from "../services/questionService";
import { Request, Response } from "express";
import { Question } from "../models/question";

export default class QuestionController {
    static async getExam(req: Request, res: Response) {
        try {   
          const exam = await QuestionService.getExam();
          res.status(200).send(exam);
        } catch (e) {
          res.status(400).json((e as Error).message);
        }
      }
}