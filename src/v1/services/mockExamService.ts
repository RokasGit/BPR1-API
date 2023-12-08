import MockExamData from "../database/mockExamData";
import TopicService from "./topicService";
import UserService from "./userService";

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
  static async checkMockExam(mockExam: MockExam): Promise<number> {
    try {
      return await MockExamData.createMockExam(mockExam);
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
      let questionList: QuestionList = {
        questions: [],
        totalQuestions: 0,
      };
      let numberOfTopics = topics.length;
      let numberOfQuestionsPerTopic = 30 / numberOfTopics;

      topics.forEach(async (topic) => {
        if (questionList.totalQuestions < 30) {
          let questions = await TopicService.getTopicQuestions(
            user_id,
            topic.id
          ).then((questionList: QuestionList) => {
            let questions = questionList.questions;
            return questions;
          });
          questions.forEach((question: Question) => {
            if (questionList.totalQuestions < 30) {
              questionList.questions.push(question);
              questionList.totalQuestions++;
            }
          });
        }
      });
      //   to await for the foreach loop to finish
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
