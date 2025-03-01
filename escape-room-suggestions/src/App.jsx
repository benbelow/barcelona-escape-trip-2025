import { useState } from 'react'
import './App.css'
import Questionnaire from './components/Questionnaire'
import RoomSuggestions from './components/RoomSuggestions'

function App() {
  const [answers, setAnswers] = useState(null);

  const handleQuestionnaireComplete = (questionnaireAnswers) => {
    setAnswers(questionnaireAnswers);
  };

  return (
    <div className="app">
      <header>
        <h1>Escape Room Finder</h1>
        <p>Find your perfect escape room adventure!</p>
      </header>
      
      <main>
        {!answers ? (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        ) : (
          <RoomSuggestions answers={answers} />
        )}
      </main>
    </div>
  )
}

export default App
