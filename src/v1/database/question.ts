import { db } from "../database/index";
import { Question } from "../models/question";
import e from "express";

export default class QuestionData {
    // Function to check if a topic exists by name
    static async topicExists(name: string): Promise<boolean> {
        try {
            const topic = await db("Tickets.topic").where({ name }).first();
            return !!topic;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    // Function to get a question by ID
    static async getQuestionById(questionId: number): Promise<object | null> {
        try {
            const question = await db("Tickets.question").where({ id: questionId }).first();
            return question || null;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    // Function to get answers for a question by question ID
    static async getAnswersForQuestion(questionId: number): Promise<object[]> {
        try {
            const answers = await db("Tickets.answer").where({ question_id: questionId });
            return answers;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    // Function to get 30 random questions from different topics
    static async getExam(): Promise<Question[]> {
        try {
            // Get 30 random questions
            const questions = await db('Tickets.question')
                .join('Tickets.topic', 'question.topic_id', 'topic.id')
                .select('question.*', 'topic.name as topicName', 'topic.description as topicDescription', 'topic.image as topicImage')
                .orderByRaw('RAND()')
                .limit(3); //change number later

            // Now, for each question, get the answers
            const questionsWithAnswers = await Promise.all(questions.map(async (q) => {
                const answers = await db('Tickets.answer').where({ question_id: q.id });

                // Map the raw database answers to the Answer interface
                const mappedAnswers = answers.map(a => ({
                    answer: a.answer,
                    questionId: a.question_id,
                    is_correct: !!a.is_correct // Cast to boolean
                }));

                // Return the question mapped to the Question interface
                return {
                    question: q.question,
                    topic_id: q.topic_id,
                    image: q.image,
                    explanation: q.explanation,
                    answers: mappedAnswers,
                    topic: {
                        name: q.topicName,
                        description: q.topicDescription,
                        image: q.topicImage // Assuming that 'index' refers to the image of the topic
                    }
                };
            }));

            return questionsWithAnswers;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    static async getQuestionsByTopic(topicId: number): Promise<Question[]> {
        try {
          // Get questions for the given topic ID
          const questions = await db('Tickets.question')
                                  .join('Tickets.topic', 'question.topic_id', 'topic.id')
                                  .where('question.topic_id', topicId)
                                  .select('question.*', 'topic.name as topicName', 'topic.description as topicDescription', 'topic.image as topicImage');
      
          // Now, for each question, get the answers
          const questionsWithAnswers = await Promise.all(questions.map(async (q) => {
            const answers = await db('Tickets.answer').where({ question_id: q.id });
      
            // Map the raw database answers to the Answer interface
            const mappedAnswers = answers.map(a => ({
              answer: a.answer,
              questionId: a.question_id,
              is_correct: !!a.is_correct // Cast to boolean
            }));
      
            // Return the question mapped to the Question interface
            return {
              question: q.question,
              topic_id: q.topic_id,
              image: q.image,
              explanation: q.explanation,
              answers: mappedAnswers,
              topic: {
                name: q.topicName,
                description: q.topicDescription,
                image: q.topicImage // Assuming that 'index' refers to the image of the topic
              }
            };
          }));
      
          return questionsWithAnswers;
        } catch (e:any) {
          throw new Error(e.message);
        }
      }

}