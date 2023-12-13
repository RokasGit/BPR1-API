import MockExamService from "../services/mockExamService";
import { MockExam } from "../models/mockExam";
import { Request, Response } from "express";
import cache from "../utils/cacheUtils";
export default class MockExamController {
  static async getMockExamsByUserId(req: Request, res: Response) {
    try {
      const user_id: number | undefined = req.user?.user_id;

      if (user_id === undefined || isNaN(user_id) || user_id <= 0) {
        return res.status(400).json({
          error: "Invalid or missing user ID",
        });
      }
      const mockExams = await MockExamService.getMockExamsByUserId(user_id);
      if (!mockExams || mockExams.length === 0) {
        return res.status(404).json({
          error: "Mock exams not found",
        });
      }
      res.status(200).json(mockExams);
    } catch (error: any) {
      console.error("Error fetching mock exams:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getMockExamById(req: Request, res: Response) {
    try {
      const mockExamId: number = parseInt(req.params.mockExam_id);

      if (isNaN(mockExamId) || mockExamId <= 0) {
        return res.status(400).json({
          error: "Invalid mock exam ID",
        });
      }

      const mockExam = await MockExamService.getMockExamById(mockExamId);
      if (!mockExam) {
        return res.status(404).json({ error: "Mock exam not found" });
      }
      if (mockExam.user_id !== req.user?.user_id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      res.status(200).json(mockExam);
    } catch (error: any) {
      console.error("Error fetching mock exam by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async checkMockExam(req: Request, res: Response) {
    try {
      const mockExamData: MockExam = req.body;

      if (!mockExamData || typeof mockExamData !== "object") {
        return res.status(400).json({
          error: "Invalid mock exam data",
        });
      }

      const checkedMockExam = await MockExamService.checkMockExam(mockExamData);
      cache.flushAll();
      res.status(200).json(checkedMockExam);
    } catch (error: any) {
      console.error("Error checking mock exam:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getNewMockExam(req: Request, res: Response) {
    try {
      const user_id = req.user?.user_id;
      if (!user_id) {
        return res.status(400).json({
          error: "User ID is missing or invalid",
        });
      }

      const language_id = parseInt(req.params.language_id);
      if (isNaN(language_id)) {
        return res.status(400).json({ error: "Invalid language ID" });
      }

      const mockExam = await MockExamService.getNewMockExam(
        user_id,
        language_id
      );
      res.status(200).json(mockExam);
    } catch (error: any) {
      console.error("Error fetching new mock exam:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
