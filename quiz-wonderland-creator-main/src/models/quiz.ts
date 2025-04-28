
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  answeredCorrectly: string[]; // ids of correctly answered questions
}
