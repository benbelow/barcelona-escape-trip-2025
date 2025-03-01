import { rooms } from '../data/rooms';

const getRoomCountTier = (preference) => {
  switch (preference) {
    case "Just the best rooms":
      return 1;
    case "Escape-room focussed, but not too intense":
      return 2;
    case "Fairly packed":
      return 3;
    case "As many as possible. Bring 'em on!":
      return 4;
    default:
      return 1;
  }
};

const getMaxHorrorLevel = (preference) => {
  switch (preference) {
    case "No Horror At All, Thanks":
      return 0;
    case "Will play very good horror, but prefer non-horror":
      return 1;
    case "As happy with horror as not":
      return 2;
    case "Actively Seek Out Horror":
      return 3;
    default:
      return 0;
  }
};

export default function RoomSuggestions({ answers }) {
  const desiredTier = getRoomCountTier(answers[0]);
  const maxHorrorLevel = getMaxHorrorLevel(answers[1]);

  const suggestedRooms = rooms.filter(room => {
    return room.expectedTier <= desiredTier && 
           room.horrorLevel <= maxHorrorLevel;
  });

  return (
    <div className="room-suggestions">
      <h2>Suggested Rooms</h2>
      <div className="rooms-grid">
        {suggestedRooms.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-image">
              <img src={room.imageUrl} alt={room.name} />
              {room.horrorLevel > 0 && (
                <div className="horror-badge">
                  Horror Level {room.horrorLevel}
                </div>
              )}
            </div>
            <div className="room-content">
              <h3>{room.name}</h3>
              <div className="room-details">
                <p><strong>Tier:</strong> {room.expectedTier}</p>
                {room.theme && <p><strong>Theme:</strong> {room.theme}</p>}
                {room.description && <p className="room-description">{room.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
