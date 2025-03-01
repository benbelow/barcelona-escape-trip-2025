import { useState } from 'react';
import './RoomGrid.css';

export default function RoomGrid({ rooms }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (roomId) => {
    setImageErrors(prev => ({
      ...prev,
      [roomId]: true
    }));
  };

  return (
    <div className="rooms-grid">
      {rooms.map(room => (
        <div key={room.id} className="room-card">
          <div className="room-image">
            {!imageErrors[room.id] ? (
              <img 
                src={room.imageUrl} 
                alt={room.name}
                onError={() => handleImageError(room.id)}
              />
            ) : (
              <div className="image-fallback">
                {room.name}
              </div>
            )}
            {room.horrorLevel > 0 && (
              <div className="horror-badge">
                Horror Level {room.horrorLevel}
              </div>
            )}
          </div>
          <div className="room-content">
            <h3>{room.name}</h3>
            <div className="room-details">
              {room.theme && <p><strong>Theme:</strong> {room.theme}</p>}
              {room.description && <p className="room-description">{room.description}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
