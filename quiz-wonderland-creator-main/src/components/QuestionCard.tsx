
import React, { useState } from 'react';
import { QuizQuestion, QuizOption } from '@/models/quiz';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSubmit: (optionId: string) => void;
  showFeedback?: boolean;
  userAnswer?: string;
  isLast?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswerSubmit, 
  showFeedback = false,
  userAnswer,
  isLast = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswer || null);
  
  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent selection if showing feedback
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswerSubmit(selectedOption);
    }
  };

  const getOptionClasses = (option: QuizOption) => {
    if (!showFeedback) {
      return cn(
        "quiz-option",
        selectedOption === option.id ? "quiz-option-selected" : ""
      );
    } else {
      if (option.id === question.correctOptionId) {
        return "quiz-option quiz-option-correct";
      } else if (option.id === selectedOption && option.id !== question.correctOptionId) {
        return "quiz-option quiz-option-incorrect";
      } else {
        return "quiz-option";
      }
    }
  };

  return (
    <div className="animate-fade-in quiz-card max-w-2xl mx-auto mb-8">
      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option) => (
          <div
            key={option.id}
            className={getOptionClasses(option)}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>
      
      {!showFeedback && (
        <Button 
          onClick={handleSubmit}
          className="quiz-btn-primary w-full"
          disabled={!selectedOption}
        >
          {isLast ? "Finish Quiz" : "Next Question"}
        </Button>
      )}
      
      {showFeedback && (
        <div className="mt-4">
          {selectedOption === question.correctOptionId ? (
            <div className="text-quiz-correct font-medium">Correct! 🎉</div>
          ) : (
            <div className="text-quiz-incorrect font-medium">
              Incorrect. The right answer was: {
                question.options.find(opt => opt.id === question.correctOptionId)?.text
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
