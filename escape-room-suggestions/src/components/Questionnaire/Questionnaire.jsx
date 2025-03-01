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

function HorrorCompositeQuestion({ question, answers, onAnswer, onHorrorPreferences }) {
  const horrorPreferences = answers[QuestionId.HORROR_PREFERENCES] || {};
  const isEnabled = horrorPreferences.enabled || false;
  const selectedAnswer = answers[question.id];

  const handleToggleEnable = () => {
    if (!isEnabled) {
      // When enabling, initialize all preferences to false
      const initialPreferences = {
        enabled: true
      };
      question.subPreferences.forEach(pref => {
        initialPreferences[pref.id] = false;
      });
      onHorrorPreferences(initialPreferences);
    } else {
      // When disabling, remove all preferences
      onAnswer(QuestionId.HORROR_PREFERENCES, undefined);
    }
  };

  const handlePreferenceChange = (prefId) => {
    onHorrorPreferences({
      ...horrorPreferences,
      [prefId]: !horrorPreferences[prefId]
    });
  };

  return (
    <div className="horror-composite">
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.id)}
            className={`option-button ${selectedAnswer === option.id ? 'selected' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedAnswer !== HorrorPreference.NONE && (
        <div className="horror-preferences">
          <label className="enable-preferences">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={handleToggleEnable}
            />
            {question.enableQuestion}
          </label>

          {isEnabled && (
            <div className="preferences-grid">
              {question.subPreferences.map(pref => (
                <label key={pref.id} className="preference-option">
                  <input
                    type="checkbox"
                    checked={horrorPreferences[pref.id] || false}
                    onChange={() => handlePreferenceChange(pref.id)}
                  />
                  {pref.label}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
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
  if (currentQuestion.skipIf?.(answers)) {
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

  const handleHorrorPreferences = (preferences) => {
    updateAnswer(QuestionId.HORROR_PREFERENCES, preferences);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/question/${currentQuestionIndex + 2}`);
    } else {
      navigate('/results');
    }
  };

  const canProceed = () => {
    if (currentQuestion.optional) return true;
    
    if (currentQuestion.type === 'single') {
      return !!answers[currentQuestion.id];
    }
    if (currentQuestion.type === 'multiple') {
      const selected = answers[currentQuestion.id] || [];
      return selected.length > 0;
    }
    if (currentQuestion.type === 'horror-composite') {
      const hasAnswer = !!answers[currentQuestion.id];
      const prefs = answers[QuestionId.HORROR_PREFERENCES] || {};
      
      return hasAnswer && (
        answers[currentQuestion.id] === HorrorPreference.NONE ||
        !prefs.enabled ||
        currentQuestion.subPreferences.some(pref => prefs[pref.id])
      );
    }
    return false;
  };

  return (
    <div className="questionnaire">
      <div className="progress">
        Question {currentQuestionIndex + 1} of {questions.length}
        {currentQuestion.optional && <span className="optional-label"> (Optional)</span>}
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
        <MultipleChoiceQuestion
          question={currentQuestion}
          selectedAnswers={answers[currentQuestion.id] || []}
          onAnswer={handleAnswer}
        />
      )}

      {currentQuestion.type === 'horror-composite' && (
        <HorrorCompositeQuestion
          question={currentQuestion}
          answers={answers}
          onAnswer={updateAnswer}
          onHorrorPreferences={handleHorrorPreferences}
        />
      )}

      <div className="navigation">
        {currentQuestionIndex > 0 && (
          <button 
            className="nav-button"
            onClick={() => navigate(`/question/${currentQuestionIndex}`)}
          >
            Previous Question
          </button>
        )}
        {canProceed() && currentQuestionIndex < questions.length - 1 && (
          <button 
            className="nav-button"
            onClick={handleNext}
          >
            Next Question
          </button>
        )}
        {canProceed() && currentQuestionIndex === questions.length - 1 && (
          <button 
            className="nav-button"
            onClick={() => navigate('/results')}
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
}
