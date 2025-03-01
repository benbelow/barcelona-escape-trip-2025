import { useNavigate, useParams } from 'react-router-dom';
import { questions, useQuestionnaire } from '../../context/QuestionnaireContext';
import { HorrorPreference } from '../../constants/horrorTypes';
import { QuestionId } from '../../constants/questionIds';
import './Questionnaire.css';

function SingleChoiceQuestion({ question, selectedAnswer, onAnswer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        const optionValue = typeof option === 'object' ? option.id : option;
        const optionLabel = typeof option === 'object' ? option.label : option;
        
        return (
          <button
            key={index}
            onClick={() => onAnswer(optionValue)}
            className={`option-button ${selectedAnswer === optionValue ? 'selected' : ''}`}
          >
            {optionLabel}
          </button>
        );
      })}
    </div>
  );
}

function MultipleChoiceQuestion({ question, selectedAnswers = [], onAnswer }) {
  const toggleOption = (optionId) => {
    const newAnswers = selectedAnswers.includes(optionId)
      ? selectedAnswers.filter(id => id !== optionId)
      : [...selectedAnswers, optionId];
    onAnswer(newAnswers, false); // Don't auto-progress
  };

  return (
    <div className="preferences-grid">
      {question.options.map(option => (
        <label key={option.id} className="preference-option">
          <input
            type="checkbox"
            checked={selectedAnswers.includes(option.id)}
            onChange={() => toggleOption(option.id)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default function Questionnaire() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { answers, updateAnswer } = useQuestionnaire();
  
  const currentQuestionIndex = questionId ? parseInt(questionId) - 1 : 0;
  const currentQuestion = questions[currentQuestionIndex];

  // Skip questions based on conditions
  if (currentQuestion?.skipIf?.(answers)) {
    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else {
      navigate('/results');
    }
    return null;
  }

  const handleAnswer = (answer, autoProgress = true) => {
    updateAnswer(currentQuestion.id, answer);
    
    if (autoProgress && currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else if (autoProgress) {
      navigate('/results');
    }
  };

  const handleSkip = () => {
    if (currentQuestion.defaultValue) {
      updateAnswer(currentQuestion.id, currentQuestion.defaultValue);
    }
    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else {
      navigate('/results');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else {
      navigate('/results');
    }
  };

  const canProceed = () => {
    if (currentQuestion.optional || currentQuestion.skippable) return true;
    
    if (currentQuestion.type === 'single') {
      return !!answers[currentQuestion.id];
    }
    if (currentQuestion.type === 'multiple') {
      const selected = answers[currentQuestion.id] || [];
      return selected.length > 0;
    }
    return false;
  };

  if (!currentQuestion) {
    navigate('/results');
    return null;
  }

  return (
    <div className="questionnaire">
      <div className="question-header">
        <div className="progress">
          Question {currentQuestionIndex + 1} of {questions.length}
          {currentQuestion.optional && <span className="optional-label">(Optional)</span>}
        </div>
        {currentQuestion.skippable && (
          <button onClick={handleSkip} className="skip-button">
            Skip this question
          </button>
        )}
      </div>
      
      <h2>{currentQuestion.question}</h2>
      
      {currentQuestion.type === 'single' && (
        <SingleChoiceQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />
      )}
      
      {currentQuestion.type === 'multiple' && (
        <>
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedAnswers={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
          <div className="navigation">
            <button 
              onClick={handleNext}
              className="next-button"
              disabled={!canProceed()}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next Question'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
