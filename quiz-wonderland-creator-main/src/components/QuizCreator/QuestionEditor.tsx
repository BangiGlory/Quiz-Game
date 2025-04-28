
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuizQuestion, QuizOption } from '@/models/quiz';
import { generateId } from '@/utils/idGenerator';
import { Trash2, Plus, CheckCircle } from 'lucide-react';

interface QuestionEditorProps {
  question: QuizQuestion;
  onQuestionUpdate: (updatedQuestion: QuizQuestion) => void;
  onQuestionDelete: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onQuestionUpdate,
  onQuestionDelete
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuestionUpdate({
      ...question,
      text: e.target.value
    });
  };

  const handleOptionChange = (id: string, text: string) => {
    const updatedOptions = question.options.map(option =>
      option.id === id ? { ...option, text } : option
    );
    onQuestionUpdate({
      ...question,
      options: updatedOptions
    });
  };

  const handleCorrectOptionChange = (id: string) => {
    onQuestionUpdate({
      ...question,
      correctOptionId: id
    });
  };

  const addOption = () => {
    if (question.options.length < 5) {
      const newOption: QuizOption = {
        id: generateId(),
        text: ""
      };
      onQuestionUpdate({
        ...question,
        options: [...question.options, newOption],
        correctOptionId: question.correctOptionId || newOption.id
      });
    }
  };

  const deleteOption = (id: string) => {
    if (question.options.length > 2) {
      const updatedOptions = question.options.filter(option => option.id !== id);
      const updatedQuestion = {
        ...question,
        options: updatedOptions
      };

      // If we're deleting the correct option, select the first one
      if (question.correctOptionId === id) {
        updatedQuestion.correctOptionId = updatedOptions[0].id;
      }

      onQuestionUpdate(updatedQuestion);
    }
  };

  return (
    <div className="quiz-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Question</h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={onQuestionDelete}
        >
          <Trash2 size={18} />
        </Button>
      </div>
      
      <Input
        value={question.text}
        onChange={handleTextChange}
        placeholder="Enter your question"
        className="mb-4"
      />
      
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-600">Answer Options</h4>
        
        {question.options.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 ${
                question.correctOptionId === option.id
                  ? 'text-quiz-correct'
                  : 'text-gray-400'
              }`}
              onClick={() => handleCorrectOptionChange(option.id)}
              title="Set as correct answer"
            >
              <CheckCircle size={18} />
            </Button>
            
            <Input
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              placeholder="Enter an option"
              className="flex-1"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteOption(option.id)}
              disabled={question.options.length <= 2}
              className="text-red-500"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
      
      <Button
        onClick={addOption}
        variant="outline"
        className="mt-4 flex items-center gap-1 w-full justify-center"
        disabled={question.options.length >= 5}
      >
        <Plus size={16} />
        Add Option
      </Button>
    </div>
  );
};

export default QuestionEditor;
