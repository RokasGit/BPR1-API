import { QuestionList } from "./questionList";
import { User } from "./user";
export interface MockExam {
  id: number;
  user: User;
  percentage: number;
  questions?: QuestionList;
}
