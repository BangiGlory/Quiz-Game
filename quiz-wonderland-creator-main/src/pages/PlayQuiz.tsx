
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/contexts/QuizContext';
import { PageHeader } from '@/components/ui/page-header';
import QuestionCard from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const PlayQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuiz, addQuizResult } = useQuiz();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const quiz = id ? getQuiz(id) : undefined;
  
  useEffect(() => {
    if (!quiz) {
      toast.error("Quiz not found");
      navigate('/');
    }
  }, [quiz, navigate]);
  
  if (!quiz) return null;
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  
  const handleAnswerSubmit = (optionId: string) => {
    // Save the answer
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId
    });
    
    // Show feedback
    setShowFeedback(true);
    
    // After a delay, move to the next question or complete the quiz
    setTimeout(() => {
      setShowFeedback(false);
      
      if (isLastQuestion) {
        completeQuiz({
          ...answers,
          [currentQuestion.id]: optionId
        });
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1500);
  };
  
  const completeQuiz = (finalAnswers: Record<string, string>) => {
    // Calculate results
    const correctAnswers = quiz.questions.filter(
      question => finalAnswers[question.id] === question.correctOptionId
    );
    
    const score = correctAnswers.length;
    
    // Save the result
    addQuizResult({
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      answeredCorrectly: correctAnswers.map(q => q.id)
    });
    
    setQuizCompleted(true);
    toast.success("Quiz completed!");
  };
  
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  if (quizCompleted) {
    const score = quiz.questions.filter(
      question => answers[question.id] === question.correctOptionId
    ).length;
    
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          <PageHeader title="Quiz Completed!" />
          
          <div className="quiz-card text-center py-8">
            <h2 className="text-2xl font-bold mb-6">Your Results</h2>
            
            <div className="mb-6">
              <div className="text-5xl font-bold text-quiz-purple mb-2">{percentage}%</div>
              <div className="text-lg">
                You got <span className="font-semibold">{score}</span> out of{" "}
                <span className="font-semibold">{quiz.questions.length}</span> questions right!
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" onClick={() => navigate('/')}>
                Back to Quizzes
              </Button>
              <Button className="quiz-btn-primary" onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
                setQuizCompleted(false);
              }}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        <PageHeader title={quiz.title} description={quiz.description}>
          <Button variant="outline" onClick={() => navigate('/')} className="quiz-btn-secondary">
            Exit Quiz
          </Button>
        </PageHeader>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <QuestionCard 
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          showFeedback={showFeedback}
          userAnswer={answers[currentQuestion.id]}
          isLast={isLastQuestion}
        />
      </div>
    </div>
  );
};

export default PlayQuiz;
