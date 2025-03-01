import { rooms } from '../../data/rooms';
import RoomGrid from '../RoomGrid/RoomGrid';
import './AllRooms.css';

export default function AllRooms() {
  return (
    <div className="all-rooms">
      <h2>All Escape Rooms</h2>
      <RoomGrid rooms={rooms} />
    </div>
  );
}
