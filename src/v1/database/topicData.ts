import { db } from "./index";
import { Topic } from "../models/topic";
import { QuestionList } from "../models/questionList";

export default class TopicData {
  static async getAllTopics(): Promise<Topic[]> {
    try {
      let topics = await db("Tickets.topic").select();
      return topics;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getTopicsByLanguage(language_id: number): Promise<Topic[]> {
    try {
      let topics = await db("Tickets.topic")
        .select()
        .where("language_id", language_id);
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
      let questionList: QuestionList = await db("Tickets.question")
        .select(
          "question.id as question_id",
          "question.question",
          "question.topic_id",
          "question.image",
          "question.explanation",
          "answer.id as answer_id",
          "answer.answer",
          "answer.is_correct",
          "questionStatus.status"
        )
        .from("Tickets.question")
        .leftJoin("Tickets.answer", "question.id", "answer.question_id")
        .leftJoin("Tickets.questionStatus", function () {
          this.on("question.id", "=", "questionStatus.question_id").andOn(
            "questionStatus.user_id",
            "=",
            user_id
          );
        })
        .where("question.topic_id", topic_id)
        .then((rows: any) => {
          //   let questionList: QuestionList =
          //     {};
          rows.forEach((row: any) => {
            console.log(row);
          });
        });
      return questionList;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
