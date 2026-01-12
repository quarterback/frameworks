import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/questions';
import { calculateScoresWithQuestions } from '../utils/scoring';
import './QuizPage.css';

function QuizPage() {
  const navigate = useNavigate();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentModule = modules[currentModuleIndex];
  const currentQuestion = currentModule.questions[currentQuestionIndex];
  const totalQuestions = modules.reduce((sum, m) => sum + m.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (answerId) => {
    // Save the answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answerId
    };
    setAnswers(newAnswers);

    // Move to next question
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      // Next question in same module
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      // Next module
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Quiz complete - calculate results and navigate
      const results = calculateScoresWithQuestions(newAnswers, modules);
      // Store results and navigate
      const resultId = generateResultId();
      localStorage.setItem(`result-${resultId}`, JSON.stringify({
        results,
        answers: newAnswers,
        timestamp: new Date().toISOString()
      }));
      navigate(`/results/${resultId}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentQuestionIndex(modules[currentModuleIndex - 1].questions.length - 1);
    }
  };

  const canGoPrevious = currentModuleIndex > 0 || currentQuestionIndex > 0;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-text">
            Question {answeredQuestions + 1} of {totalQuestions}
          </p>
        </div>

        {/* Module Header */}
        <div className="module-header">
          <h2 className="module-name">{currentModule.name}</h2>
          <p className="module-description">{currentModule.description}</p>
          <p className="module-progress">
            Module {currentModuleIndex + 1} of {modules.length} • 
            Question {currentQuestionIndex + 1} of {currentModule.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="question-section">
          <h3 className="question-text">{currentQuestion.text}</h3>
          
          <div className="answers-container">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                className={`answer-button ${currentAnswer === answer.id ? 'selected' : ''}`}
                onClick={() => handleAnswer(answer.id)}
              >
                <span className="answer-label">{answer.id.toUpperCase()}</span>
                <span className="answer-text">{answer.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation-section">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
          >
            ← Previous
          </button>
          
          <button
            className="nav-button home-button"
            onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                navigate('/');
              }
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

// Generate a simple unique ID for results
function generateResultId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default QuizPage;
