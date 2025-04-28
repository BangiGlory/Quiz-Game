
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/QuizCard';
import EmptyState from '@/components/EmptyState';
import { Plus, BookOpen } from 'lucide-react';

const Index = () => {
  const { quizzes, setCurrentQuiz } = useQuiz();
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('/create');
  };

  const handlePlayQuiz = (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      navigate(`/play/${quizId}`);
    }
  };

  const handleEditQuiz = (quizId: string) => {
    navigate(`/edit/${quizId}`);
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto px-4">
      <div className="animate-fade-in">
        <PageHeader 
          title="Quiz Wonderland" 
          description="Create, share and play fun quizzes!"
        >
          <Button 
            onClick={handleCreateQuiz} 
            className="quiz-btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Create Quiz
          </Button>
        </PageHeader>

        {quizzes.length === 0 ? (
          <EmptyState
            title="No quizzes yet!"
            description="Create your first quiz to get started. It's easy and fun!"
            buttonText="Create Your First Quiz"
            buttonAction={handleCreateQuiz}
            icon={<BookOpen className="h-12 w-12" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPlay={() => handlePlayQuiz(quiz.id)}
                onEdit={() => handleEditQuiz(quiz.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
