import { createContext, useContext, useState } from 'react';
import { HorrorTypes, HorrorTypeLabels, HorrorPreference } from '../constants/horrorTypes';
import { RoomQuantityPreference, RoomQuantityLabels } from '../constants/roomPreferences';
import { RoomProperties, RoomPropertyLabels } from '../constants/roomProperties';
import { QuestionId } from '../constants/questionIds';

const QuestionnaireContext = createContext(null);

export const questions = [
  {
    index: 1,
    id: QuestionId.ROOM_QUANTITY,
    question: "How many escape rooms would you like to play?",
    type: "single",
    options: Object.entries(RoomQuantityPreference).map(([_, value]) => ({
      id: value,
      label: RoomQuantityLabels[value]
    }))
  },
  {
    index: 2,
    id: QuestionId.HORROR_APPETITE,
    question: "What's your appetite for horror?",
    type: "single",
    options: [
      { id: HorrorPreference.NONE, label: "No Horror At All, Thanks" },
      { id: HorrorPreference.WILL_PLAY, label: "Will play very good horror, but prefer non-horror" },
      { id: HorrorPreference.NEUTRAL, label: "As happy with horror as not" },
      { id: HorrorPreference.SEEKING, label: "Actively Seek Out Horror" }
    ]
  },
  {
    index: 3,
    id: QuestionId.HORROR_PREFERENCES,
    question: "What types of horror are you happy with?",
    type: "multiple",
    optional: true,
    skippable: true,
    skipIf: (answers) => answers[QuestionId.HORROR_APPETITE] === HorrorPreference.NONE,
    options: Object.entries(HorrorTypes).map(([_, value]) => ({
      id: value,
      label: HorrorTypeLabels[value]
    })),
    defaultValue: Object.values(HorrorTypes)
  },
  {
    index: 4,
    id: QuestionId.ROOM_PROPERTIES,
    question: "Select the properties you value most in an escape room",
    type: "multiple",
    skippable: true,
    options: Object.entries(RoomProperties).map(([_, value]) => ({
      id: value,
      label: RoomPropertyLabels[value]
    })),
    defaultValue: []
  }
];

export function QuestionnaireProvider({ children }) {
  const [answers, setAnswers] = useState(() => {
    // Set initial state with default values for questions that have them
    const initialAnswers = {};
    questions.forEach(question => {
      if (question.defaultValue !== undefined) {
        initialAnswers[question.id] = question.defaultValue;
      }
    });
    return initialAnswers;
  });

  const updateAnswer = (questionId, answer) => {
    setAnswers(prev => {
      // If updating horror appetite and it's set to "no horror",
      // clear any horror preferences
      if (questionId === QuestionId.HORROR_APPETITE && answer === HorrorPreference.NONE) {
        const { [QuestionId.HORROR_PREFERENCES]: _, ...rest } = prev;
        return {
          ...rest,
          [questionId]: answer
        };
      }
      return {
        ...prev,
        [questionId]: answer
      };
    });
  };

  const resetAnswers = () => {
    setAnswers({});
  };

  return (
    <QuestionnaireContext.Provider value={{ 
      answers, 
      updateAnswer,
      resetAnswers 
    }}>
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
