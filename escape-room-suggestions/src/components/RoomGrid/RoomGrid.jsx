import React, { useState } from 'react';
import { HorrorLevels } from '../../constants/horrorTypes';
import { RoomPropertyLabels } from '../../constants/roomProperties';
import terpecaTopLogo from '../../assets/2024TERPECATopRoom.png';
import terpecaFinalistLogo from '../../assets/2024TERPECABadgeFinalist.png';
import './RoomGrid.css';

const getTravelInfo = (room) => {
  const { minutesByCar, minutesByPublicTransport } = room;
  
  if (minutesByPublicTransport <= 40) {
    return {
      time: minutesByPublicTransport,
      emoji: '🚂',
      className: 'local'
    };
  }
  
  const bestTime = Math.min(minutesByCar, minutesByPublicTransport);
  const usesCar = minutesByCar < minutesByPublicTransport;
  
  return {
    time: bestTime,
    emoji: usesCar ? '🚗' : '🚂',
    className: bestTime <= 60 ? 'medium' : 'far'
  };
};

export default function RoomGrid({ rooms, onRemoveRoom }) {
  const [imageErrors, setImageErrors] = useState({});
  const [animatingRooms, setAnimatingRooms] = useState(new Set());

  const handleImageError = (roomId) => {
    setImageErrors(prev => ({ ...prev, [roomId]: true }));
  };

  const handleRemove = (roomId, e) => {
    e.preventDefault();
    if (onRemoveRoom) {
      setAnimatingRooms(prev => new Set([...prev, roomId]));
      setTimeout(() => {
        onRemoveRoom(roomId);
        setAnimatingRooms(prev => {
          const newSet = new Set(prev);
          newSet.delete(roomId);
          return newSet;
        });
      }, 300);
    }
  };

  return (
    <div className="rooms-grid">
      {rooms.map(room => {
        const travelInfo = getTravelInfo(room);
        
        return (
          <div 
            key={room.id} 
            className={`room-card ${animatingRooms.has(room.id) ? 'removing' : ''}`}
          >
            <button 
              className="remove-room" 
              onClick={(e) => handleRemove(room.id, e)}
              aria-label="Remove room from results"
            >
              ×
            </button>
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
              {room.terpeca2024 && (
                <div className="terpeca-badge">
                  <img 
                    src={room.terpeca2024 <= 100 ? terpecaTopLogo : terpecaFinalistLogo} 
                    alt={room.terpeca2024 <= 100 ? "TERPECA 2024 Top Room" : "TERPECA 2024 Finalist"}
                  />
                </div>
              )}
            </div>
            <div className="room-content">
              <h3>{room.name}</h3>
              <div className="room-details">
                {(room.theme || room.horrorLevel !== HorrorLevels.NOT_HORROR) && (
                  <div className="theme-container">
                    {room.theme && <span className="theme-pill">{room.theme}</span>}
                    {room.horrorLevel !== HorrorLevels.NOT_HORROR && (
                      <span className="theme-pill horror">Horror</span>
                    )}
                    <span className={`theme-pill travel-pill ${travelInfo.className}`}>
                      {travelInfo.emoji} {travelInfo.time}min
                    </span>
                  </div>
                )}
                {room.description && <p className="room-description">{room.description}</p>}
              </div>
              {room.room_properties && room.room_properties.length > 0 && (
                <div className="room-properties">
                  {room.room_properties.map(property => (
                    <span key={property} className="property-pill">
                      {RoomPropertyLabels[property]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
