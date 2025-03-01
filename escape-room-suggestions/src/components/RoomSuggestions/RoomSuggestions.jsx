import { Link } from 'react-router-dom';
import { rooms } from '../../data/rooms';
import RoomGrid from '../RoomGrid/RoomGrid';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { applyPreferences } from '../../components/RoomSuggestions/suggest-rooms';
import './RoomSuggestions.css';

export default function RoomSuggestions() {
  const { answers } = useQuestionnaire();

  console.log(answers);

  const filteredRooms = applyPreferences(answers);

  return (
    <div className="room-suggestions">
      <div className="suggestions-header">
        <h2>Suggested Rooms</h2>
        <Link to="/question/1" className="edit-preferences">
          Edit Preferences
        </Link>
      </div>
      {filteredRooms.length > 0 ? (
        <RoomGrid rooms={filteredRooms} />
      ) : (
        <p className="no-results">No rooms match your preferences. Try adjusting your answers!</p>
      )}
    </div>
  );
}
