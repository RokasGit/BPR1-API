import { Answer } from './answer';
import { Topic } from './topic';

export interface Question {
    question: string;
    topic_id: number;
    image: string;
    explanation: string;
    answers: Answer[];
    topic: Topic;
}