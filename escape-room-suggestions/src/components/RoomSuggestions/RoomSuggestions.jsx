import { Link } from 'react-router-dom';
import { rooms } from '../../data/rooms';
import RoomGrid from '../RoomGrid/RoomGrid';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './RoomSuggestions.css';

export default function RoomSuggestions() {
  const { answers } = useQuestionnaire();

  const filteredRooms = rooms.filter(room => {
    // Filter by number of rooms (tier)
    const wantedRooms = answers['How many escape rooms would you like to play?'];
    if (wantedRooms === '1-2 rooms' && room.expectedTier !== 1) return false;
    if (wantedRooms === '3-4 rooms' && room.expectedTier !== 2) return false;
    if (wantedRooms === '5+ rooms' && room.expectedTier !== 3) return false;

    // Filter by horror preference
    const horrorPreference = answers["What's your appetite for horror?"];
    if (horrorPreference === 'No horror' && room.horrorLevel > 0) return false;
    if (horrorPreference === 'Mild horror' && room.horrorLevel > 2) return false;
    if (horrorPreference === 'Full horror' && room.horrorLevel < 2) return false;

    return true;
  });

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
