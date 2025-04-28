
import React, { createContext, useContext, useState } from 'react';
import { Quiz, QuizQuestion, QuizOption, QuizResult } from '../models/quiz';

interface QuizContextType {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  quizResults: QuizResult[];
  addQuiz: (quiz: Quiz) => void;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (quizId: string) => void;
  addQuizResult: (result: QuizResult) => void;
  getQuiz: (quizId: string) => Quiz | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Sample quiz for demonstration
const sampleQuiz: Quiz = {
  id: "sample-quiz-1",
  title: "Sample Quiz",
  description: "A fun sample quiz to get started!",
  questions: [
    {
      id: "q1",
      text: "What is the capital of France?",
      options: [
        { id: "opt1", text: "London" },
        { id: "opt2", text: "Berlin" },
        { id: "opt3", text: "Paris" },
        { id: "opt4", text: "Rome" },
      ],
      correctOptionId: "opt3",
    },
    {
      id: "q2",
      text: "Which planet is known as the Red Planet?",
      options: [
        { id: "opt1", text: "Earth" },
        { id: "opt2", text: "Mars" },
        { id: "opt3", text: "Jupiter" },
        { id: "opt4", text: "Venus" },
      ],
      correctOptionId: "opt2",
    },
  ],
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([sampleQuiz]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const addQuiz = (quiz: Quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const updateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(
      quizzes.map((quiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz))
    );
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizResults([...quizResults, result]);
  };

  const getQuiz = (quizId: string) => {
    return quizzes.find((quiz) => quiz.id === quizId);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        currentQuiz,
        quizResults,
        addQuiz,
        setCurrentQuiz,
        updateQuiz,
        deleteQuiz,
        addQuizResult,
        getQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
