import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../../data/rooms';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { applyPreferences } from './suggest-rooms';
import RoomGrid from '../RoomGrid/RoomGrid';
import './RoomSuggestions.css';

export default function RoomSuggestions() {
  const { answers } = useQuestionnaire();
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [excludedRooms, setExcludedRooms] = useState(new Set());

  useEffect(() => {
    // Reset excluded rooms when answers change
    setExcludedRooms(new Set());
    updateSuggestions();
  }, [answers]);

  const updateSuggestions = () => {
    const suggestions = applyPreferences(answers, Array.from(excludedRooms));
    setSuggestedRooms(suggestions);
  };

  const handleRemoveRoom = (roomId) => {
    setExcludedRooms(prev => {
      const next = new Set(prev);
      next.add(roomId);
      return next;
    });
    
    // Get new suggestions excluding this room
    const suggestions = applyPreferences(answers, [...excludedRooms, roomId]);
    setSuggestedRooms(suggestions);
  };

  return (
    <div className="room-suggestions">
      <div className="suggestions-header">
        <h2>Suggested Rooms</h2>
        <Link to="/question/1" className="edit-preferences">
          Edit Preferences
        </Link>
      </div>
      {suggestedRooms.length > 0 ? (
        <RoomGrid 
          rooms={suggestedRooms} 
          onRemoveRoom={handleRemoveRoom}
        />
      ) : (
        <p className="no-results">No rooms match your preferences. Try adjusting your answers!</p>
      )}
    </div>
  );
}
