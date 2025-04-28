
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import QuizForm from '@/components/QuizCreator/QuizForm';

const CreateQuiz = () => {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <PageHeader 
          title="Create a Quiz" 
          description="Add questions and answers to create your fun quiz"
        />
        <QuizForm />
      </div>
    </div>
  );
};

export default CreateQuiz;
