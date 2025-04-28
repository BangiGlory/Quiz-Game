
import React from 'react';
import { Button } from './ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonText,
  buttonAction,
  icon
}) => {
  return (
    <div className="quiz-card flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-4 text-quiz-purple text-5xl">{icon}</div>}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      {buttonText && buttonAction && (
        <Button 
          onClick={buttonAction} 
          className="quiz-btn-primary"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
