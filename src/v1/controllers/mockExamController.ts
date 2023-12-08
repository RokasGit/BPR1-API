import MockExamService from "../services/mockExamService";
import { MockExam } from "../models/mockExam";
import { Request, Response } from "express";

export default class MockExamController {
  static async getMockExamsByUserId(req: Request, res: Response) {
    try {
      let userId: number = parseInt(req.params.user_id);
      let mockExams = await MockExamService.getMockExamsByUserId(userId);
      res.status(200).json(mockExams);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }

  static async getMockExamById(req: Request, res: Response) {
    try {
      let mockExam_id: number = parseInt(req.params.mockExam_id);
      let mockExam = await MockExamService.getMockExamById(mockExam_id);
      res.status(200).json(mockExam);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }

  static async checkMockExam(req: Request, res: Response) {
    try {
      let mockExam: MockExam = req.body;
      mockExam = await MockExamService.checkMockExam(mockExam);
      res.status(200).json(mockExam);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }

  static async getNewMockExam(req: Request, res: Response) {
    try {
      let user_id = parseInt(req.params.user_id);
      let language_id = parseInt(req.params.language_id);
      let mockExam = await MockExamService.getNewMockExam(user_id, language_id);
      res.status(200).json(mockExam);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
}
