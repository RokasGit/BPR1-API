export interface QuestionReport {
  question_report_id: number;
  user_id?: number;
  question_id: number;
  report_data: Date;
  report: string;
}
