import { Answer } from "./answer";
import { QuestionStatus } from "./questionStatus";
export interface Question {
  question: string;
  topic_id: number;
  image: string;
  explanation: string;
  answers: Answer[];
  status: QuestionStatus;
}
