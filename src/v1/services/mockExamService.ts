import MockExamData from "../database/mockExamData";
import TopicService from "./topicService";
import UserService from "./userService";
import QuestionService from "./questionService";

import { QuestionList } from "../models/questionList";
import { Question } from "../models/question";
import { MockExam } from "../models/mockExam";
export default class MockExamService {
  static async getMockExamsByUserId(user_id: number): Promise<MockExam[]> {
    try {
      return await MockExamData.getMockExamsByUserId(user_id);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async getMockExamById(mockExam_id: number): Promise<MockExam> {
    try {
      return await MockExamData.getMockExamById(mockExam_id);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  static async checkMockExam(mockExam: MockExam): Promise<MockExam> {
    try {
      if (mockExam.questions != null && mockExam.answered_questions != null) {
        let correct_answers = 0;

        for (const question of mockExam.answered_questions.questions) {
          await QuestionService.checkQuestion(question, mockExam.user_id);
          if (question.status === "correct") {
            correct_answers++;
          }
        }

        mockExam.percentage =
          (correct_answers / mockExam.answered_questions.totalQuestions) * 100;
        mockExam.points =
          mockExam.percentage >= 80
            ? 10 + correct_answers
            : correct_answers - 10;
        mockExam.completion_date = new Date();

        let uploadExam = await MockExamData.checkMockExam(mockExam);
        let updateScore = await UserService.updateScore(
          mockExam.user_id,
          mockExam.points
        );

        return mockExam;
      }

      throw new Error("No questions or answers provided");
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async getNewMockExam(
    user_id: number,
    language_id: number
  ): Promise<MockExam> {
    try {
      let topics = await TopicService.getTopicsByLanguage(language_id);
      let questionSet: Set<number> = new Set();
      let questionList: QuestionList = {
        questions: [],
        totalQuestions: 0,
      };
      let numberOfTopics = topics.length;
      let numberOfQuestionsPerTopic = 30 / numberOfTopics;
      for (const topic of topics) {
        if (questionList.totalQuestions >= 30) {
          break;
        }
        let questions = await TopicService.getTopicQuestions(topic.id, user_id);
        for (const question of questions.questions) {
          if (questionList.totalQuestions >= 30) {
            break;
          }

          if (!questionSet.has(question.id)) {
            questionSet.add(question.id);
            questionList.questions.push(question);
            questionList.totalQuestions++;
          }
        }
      }
      let mockExam: MockExam = {
        user_id: user_id,
        percentage: 0,
        questions: questionList,
      };
      return mockExam;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
