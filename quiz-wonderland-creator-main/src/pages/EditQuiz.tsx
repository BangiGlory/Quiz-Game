
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui/page-header';
import QuizForm from '@/components/QuizCreator/QuizForm';
import { useQuiz } from '@/contexts/QuizContext';

const EditQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuiz } = useQuiz();
  
  const quiz = id ? getQuiz(id) : undefined;
  
  if (!quiz) {
    navigate('/');
    return null;
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <PageHeader 
          title="Edit Quiz" 
          description="Update your quiz questions and answers"
        />
        <QuizForm initialQuiz={quiz} />
      </div>
    </div>
  );
};

export default EditQuiz;
