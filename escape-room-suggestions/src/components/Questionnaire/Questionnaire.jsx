import { useNavigate, useParams } from 'react-router-dom';
import { questions, useQuestionnaire } from '../../context/QuestionnaireContext';
import './Questionnaire.css';

export default function Questionnaire() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { answers, updateAnswer } = useQuestionnaire();
  
  // Get current question index (default to 0 if on root path)
  const currentQuestionId = questionId ? parseInt(questionId) - 1 : 0;
  const currentQuestion = questions[currentQuestionId];

  const handleAnswer = (answer) => {
    updateAnswer(currentQuestion.question, answer);
    
    if (currentQuestionId < questions.length - 1) {
      // Move to next question
      navigate(`/question/${currentQuestionId + 2}`);
    } else {
      // All questions answered, go to results
      navigate('/results');
    }
  };

  return (
    <div className="questionnaire">
      <div className="progress">
        Question {currentQuestionId + 1} of {questions.length}
      </div>
      <h2>{currentQuestion.question}</h2>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`option-button ${answers[currentQuestion.question] === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation">
        {currentQuestionId > 0 && (
          <button 
            className="nav-button"
            onClick={() => navigate(`/question/${currentQuestionId}`)}
          >
            Previous Question
          </button>
        )}
        {answers[currentQuestion.question] && currentQuestionId < questions.length - 1 && (
          <button 
            className="nav-button"
            onClick={() => navigate(`/question/${currentQuestionId + 2}`)}
          >
            Next Question
          </button>
        )}
        {answers[currentQuestion.question] && currentQuestionId === questions.length - 1 && (
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
