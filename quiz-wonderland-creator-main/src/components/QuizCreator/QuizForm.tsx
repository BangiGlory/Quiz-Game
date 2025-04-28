
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuiz } from '@/contexts/QuizContext';
import { Quiz, QuizQuestion } from '@/models/quiz';
import { generateId } from '@/utils/idGenerator';
import QuestionEditor from './QuestionEditor';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface QuizFormProps {
  initialQuiz?: Quiz;
}

const QuizForm: React.FC<QuizFormProps> = ({ initialQuiz }) => {
  const navigate = useNavigate();
  const { addQuiz, updateQuiz } = useQuiz();
  const isEditing = !!initialQuiz;

  const [quiz, setQuiz] = useState<Quiz>(
    initialQuiz || {
      id: generateId(),
      title: '',
      description: '',
      questions: [createNewQuestion()]
    }
  );

  function createNewQuestion(): QuizQuestion {
    return {
      id: generateId(),
      text: '',
      options: [
        { id: generateId(), text: '' },
        { id: generateId(), text: '' }
      ],
      correctOptionId: ''
    };
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuiz({ ...quiz, description: e.target.value });
  };

  const handleQuestionUpdate = (updatedQuestion: QuizQuestion) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    });
  };

  const handleQuestionDelete = (questionId: string) => {
    if (quiz.questions.length > 1) {
      setQuiz({
        ...quiz,
        questions: quiz.questions.filter((q) => q.id !== questionId)
      });
    } else {
      toast.error("A quiz must have at least one question.");
    }
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, createNewQuestion()]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the quiz
    if (!quiz.title.trim()) {
      toast.error("Please provide a title for your quiz.");
      return;
    }

    if (!quiz.description.trim()) {
      toast.error("Please provide a description for your quiz.");
      return;
    }

    // Validate questions
    for (const question of quiz.questions) {
      if (!question.text.trim()) {
        toast.error("All questions must have text.");
        return;
      }

      if (!question.correctOptionId) {
        toast.error("Each question must have a correct answer selected.");
        return;
      }

      for (const option of question.options) {
        if (!option.text.trim()) {
          toast.error("All answer options must have text.");
          return;
        }
      }
    }

    // Save the quiz
    if (isEditing) {
      updateQuiz(quiz);
      toast.success("Quiz updated successfully!");
    } else {
      addQuiz(quiz);
      toast.success("Quiz created successfully!");
    }

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Quiz Title</label>
          <Input
            id="title"
            value={quiz.title}
            onChange={handleTitleChange}
            placeholder="Enter a title for your quiz"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="description"
            value={quiz.description}
            onChange={handleDescriptionChange}
            placeholder="Enter a description for your quiz"
            rows={3}
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold mt-6">Questions</h2>
          <p className="text-sm text-gray-500 mb-4">
            Add questions and options. Select the correct answer for each question.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question) => (
          <QuestionEditor
            key={question.id}
            question={question}
            onQuestionUpdate={handleQuestionUpdate}
            onQuestionDelete={() => handleQuestionDelete(question.id)}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={handleAddQuestion}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Question
      </Button>

      <div className="flex gap-4 pt-6">
        <Button type="button" variant="ghost" onClick={() => navigate('/')} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="quiz-btn-primary flex-1">
          {isEditing ? 'Update Quiz' : 'Create Quiz'}
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
