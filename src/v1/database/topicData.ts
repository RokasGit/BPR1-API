import { db } from "./index";
import { Topic } from "../models/topic";
import { QuestionList } from "../models/questionList";
import { Answer } from "../models/answer";

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
          "question.question_id as question_id",
          "question.question",
          "question.topic_id",
          "question.image",
          "question.explanation",
          "answer.answer_id as answer_id",
          "answer.answer",
          "answer.is_correct",
          "questionStatus.status"
        )
        .from("Tickets.question")
        .leftJoin(
          "Tickets.answer",
          "question.question_id",
          "answer.question_id"
        )
        .leftJoin("Tickets.questionStatus", function () {
          this.on(
            "question.question_id",
            "=",
            "questionStatus.question_id"
          ).andOn("questionStatus.user_id", "=", db.raw("?", [user_id]));
        })
        .where("question.topic_id", topic_id)
        .orderByRaw("RAND()")
        .then((rows: any) => {
          let questionList: QuestionList = {
            questions: [],
            totalQuestions: 0,
          };
          rows.forEach((row: any) => {
            let question = questionList.questions.find(
              (q) => q.question_id === row.question_id
            );
            if (!question) {
              let answer: Answer = {
                answer_id: row.answer_id,
                answer: row.answer,
                is_correct: row.is_correct === 1 ? true : false,
                questionId: row.question_id,
              };
              question = {
                question_id: row.question_id,
                question: row.question,
                topic_id: row.topic_id,
                image: row.image,
                explanation: row.explanation,
                answers: [answer],
                status: row.status ?? "unanswered",
              };
              questionList.questions.push(question);
            } else {
              question.answers.push({
                answer_id: row.answer_id,
                answer: row.answer,
                is_correct: row.is_correct === 1 ? true : false,
                questionId: row.question_id,
              });
            }
          });
          return questionList;
        });
      questionList.totalQuestions = questionList.questions.length;
      return questionList;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
