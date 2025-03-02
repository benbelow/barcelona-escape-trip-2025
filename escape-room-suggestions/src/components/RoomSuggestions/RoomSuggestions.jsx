import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { applyPreferences } from './suggest-rooms';
import RoomGrid from '../RoomGrid/RoomGrid';
import './RoomSuggestions.css';

export default function RoomSuggestions() {
  const { answers } = useQuestionnaire();
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [excludedRooms, setExcludedRooms] = useState(new Set());
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
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
    
    const suggestions = applyPreferences(answers, [...excludedRooms, roomId]);
    setSuggestedRooms(suggestions);
  };

  const handleCopyToClipboard = async () => {
    const exportData = {
      filters: answers,
      excludedRooms: Array.from(excludedRooms),
      suggestedRooms: suggestedRooms.map(room => ({
        id: room.id,
        name: room.name,
        theme: room.theme,
        horrorLevel: room.horrorLevel,
        horrorTypes: room.horrorTypes,
        room_properties: room.room_properties,
        expectedTier: room.expectedTier,
        location: room.location,
        terpeca2024: room.terpeca2024
      }))
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="room-suggestions">
      <div className="suggestions-header">
        <h1>Recommended Rooms</h1>
        <div className="header-actions">
          <button 
            className={`copy-button ${copySuccess ? 'success' : ''}`}
            onClick={handleCopyToClipboard}
          >
            {copySuccess ? 'Copied!' : 'Copy Results'}
          </button>
          <Link to="/question/1" className="edit-preferences">
            Edit Preferences
          </Link>
        </div>
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
