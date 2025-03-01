import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Questionnaire from './components/Questionnaire/Questionnaire'
import RoomSuggestions from './components/RoomSuggestions/RoomSuggestions'
import AllRooms from './components/AllRooms/AllRooms'
import { QuestionnaireProvider } from './context/QuestionnaireContext'

function App() {
  return (
    <QuestionnaireProvider>
      <Router basename="">
        <div className="app">
          <header>
            <h1>Escape Room Finder</h1>
            <nav>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/rooms" className="nav-link">All Rooms</Link>
            </nav>
          </header>
          
          <main>
            <Routes>
              <Route path="/rooms" element={<AllRooms />} />
              <Route path="/results" element={<RoomSuggestions />} />
              <Route path="/question/:questionId" element={<Questionnaire />} />
              <Route path="/" element={<Questionnaire />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QuestionnaireProvider>
  )
}

export default App
