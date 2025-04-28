
import React from 'react';
import { Button } from './ui/button';
import { Quiz } from '@/models/quiz';

interface QuizCardProps {
  quiz: Quiz;
  onPlay: () => void;
  onEdit?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onPlay, onEdit }) => {
  return (
    <div className="quiz-card flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-500 mb-4 flex-grow">{quiz.description}</p>
      <div className="text-sm text-gray-400 mb-4">
        {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}
      </div>
      <div className="flex gap-2 mt-auto">
        <Button 
          onClick={onPlay} 
          className="quiz-btn-primary flex-1"
        >
          Play
        </Button>
        {onEdit && (
          <Button 
            onClick={onEdit} 
            variant="outline" 
            className="quiz-btn-secondary flex-1"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
