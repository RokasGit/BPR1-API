import db from "../database/question";
import { Question } from "../models/question";

export default class QuestionService {
    static async getExam(): Promise<Question[]> {
        try {
            return await db.getExam();
        } catch (e: any) {
            throw Error(e.message);
        }
        
    }
}