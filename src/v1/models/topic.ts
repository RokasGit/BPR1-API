import { QuestionList } from "./questionList";
export interface Topic {
  id: number;
  name: string;
  description: string;
  image: string;
  language: string;
  questions?: QuestionList;
}
