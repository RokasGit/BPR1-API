import { Topic } from "../models/topic";
import db from "../database/topicData";
import { QuestionList } from "../models/questionList";

export default class TopicService {
  static async getAllTopics(): Promise<Topic[]> {
    try {
      let topics = await db.getAllTopics();
      return topics;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getTopicsByLanguage(language_id: number): Promise<Topic[]> {
    try {
      let topics = await db.getTopicsByLanguage(language_id);
      return topics;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getTopicQuestions(
    topic_id: number,
    user_id: number
  ): Promise<QuestionList> {
    try {
      let questionList = await db.getTopicQuestions(topic_id, user_id);
      return questionList;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
