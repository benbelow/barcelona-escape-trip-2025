import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "How many escape rooms would you like to play?",
    options: [
      "Just the best rooms",
      "Escape-room focussed, but not too intense",
      "Fairly packed",
      "As many as possible. Bring 'em on!"
    ]
  },
  {
    id: 2,
    text: "What's your appetite for horror?",
    options: [
      "No Horror At All, Thanks",
      "Will play very good horror, but prefer non-horror",
      "As happy with horror as not",
      "Actively Seek Out Horror"
    ]
  }
];

export default function Questionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="questionnaire">
      <div className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="option-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
