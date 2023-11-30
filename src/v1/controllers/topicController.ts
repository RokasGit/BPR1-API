import { Request, Response } from "express";
import topicService from "../services/topicService";
import { Topic } from "../models/topic";

export default class TopicController {
  static async getAllTopics(req: Request, res: Response) {
    try {
      const topics = await topicService.getAllTopics();
      res.status(200).send(topics);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async getTopicsByLanguage(req: Request, res: Response) {
    try {
      const language_id = parseInt(req.params.language_id);
      const topics = await topicService.getTopicsByLanguage(language_id);
      res.status(200).send(topics);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
  static async getTopicQuestions(req: Request, res: Response) {
    try {
      const topic_id = parseInt(req.params.topic_id);
      const user_id = parseInt(req.params.user_id);
      const topicQuestions = await topicService.getTopicQuestions(
        topic_id,
        user_id
      );
      res.status(200).send(topicQuestions);
    } catch (e) {
      res.status(400).json((e as Error).message);
    }
  }
}
