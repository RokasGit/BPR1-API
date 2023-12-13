import { Request, Response } from "express";
import topicService from "../services/topicService";
import { Topic } from "../models/topic";

export default class TopicController {
  static async getAllTopics(req: Request, res: Response) {
    try {
      const topics = await topicService.getAllTopics();
      res.status(200).json(topics);
    } catch (error) {
      console.error("Error fetching all topics:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getTopicsByLanguage(req: Request, res: Response) {
    try {
      const languageId: number = parseInt(req.params.language_id);
      const topics = await topicService.getTopicsByLanguage(languageId);

      if (!topics) {
        return res.status(404).json({ error: "Topics not found" });
      }

      res.status(200).json(topics);
    } catch (error) {
      console.error("Error fetching topics by language:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  static async getTopicQuestions(req: Request, res: Response) {
    try {
      const topic_id: number = parseInt(req.params.topic_id);
      if (isNaN(topic_id)) {
        return res.status(400).json({ error: "Invalid topic ID" });
      }
      const user_id: number | undefined = req.user?.user_id;
      if (user_id === undefined || isNaN(user_id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const topicQuestions = await topicService.getTopicQuestions(
        topic_id,
        user_id
      );

      if (!topicQuestions) {
        return res.status(404).json({
          error: "Topic questions not found",
        });
      }

      res.status(200).json(topicQuestions);
    } catch (error) {
      console.error("Error fetching topic questions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
