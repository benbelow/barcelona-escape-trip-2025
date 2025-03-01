import { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext(null);

export const questions = [
  {
    id: 1,
    question: "How many escape rooms would you like to play?",
    options: ["1-2 rooms", "3-4 rooms", "5+ rooms"]
  },
  {
    id: 2,
    question: "What's your appetite for horror?",
    options: ["No horror", "Mild horror", "Full horror"]
  }
];

export function QuestionnaireProvider({ children }) {
  const [answers, setAnswers] = useState({});

  const updateAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const resetAnswers = () => {
    setAnswers({});
  };

  return (
    <QuestionnaireContext.Provider value={{ answers, updateAnswer, resetAnswers }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}
