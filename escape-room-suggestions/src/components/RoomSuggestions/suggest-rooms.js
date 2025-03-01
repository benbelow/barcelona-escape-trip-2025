import { rooms } from '../../data/rooms';
import { QuestionId } from '../../constants/questionIds';
import { HorrorPreference } from '../../constants/horrorTypes';
import { PreferenceToTierMap, RoomQuantityPreference } from '../../constants/roomPreferences';

export const applyPreferences = (answers) => {
  const filteredRooms = rooms.filter(applyPreferenceFilters(answers));
  filteredRooms.sort(preferenceSortOperator(answers));
  return filteredRooms.slice(0, getNumberOfRooms(answers));
}

// Filtering out rooms that actively don't meet criteria
const applyPreferenceFilters = (answers) => {
  return (room) => {
    // Filter by horror preference
    if (!filterByHorrorPreference(answers, room)) return false;

    return true;
  }
}

const filterByHorrorPreference = (answers, room) => {
  const horrorAppetite = answers[QuestionId.HORROR_APPETITE];
  const horrorPreferences = answers[QuestionId.HORROR_PREFERENCES] || [];

  // Basic horror level filtering
  if (horrorAppetite === HorrorPreference.NONE && room.horrorLevel > 0) return false;
  if (horrorAppetite === HorrorPreference.WILL_PLAY && room.horrorLevel > 2) return false;
  if (horrorAppetite === HorrorPreference.NEUTRAL && room.horrorLevel > 3) return false;
  // No restriction for SEEKING

  // Specific horror preferences filtering
  if (horrorPreferences.length > 0 && !room.horrorTypes?.some(type => horrorPreferences.includes(type))) {
    return false;
  }

  return true;
}

// Sort rooms by preference
const preferenceSortOperator = (answers) => {
  return (roomA, roomB) => {
    // Sort by tier first
    if (roomA.expectedTier !== roomB.expectedTier) {
      return roomA.expectedTier - roomB.expectedTier;
    }

    // Then by horror level based on preference
    const horrorAppetite = answers[QuestionId.HORROR_APPETITE];
    if (horrorAppetite === HorrorPreference.SEEKING) {
      return roomB.horrorLevel - roomA.horrorLevel;
    } else {
      return roomA.horrorLevel - roomB.horrorLevel;
    }
  }
}

const getNumberOfRooms = (answers) => {
  switch (answers[QuestionId.ROOM_QUANTITY]) {
    case RoomQuantityPreference.BEST_ONLY:
      return 6;
    case RoomQuantityPreference.FOCUSED:
      return 10;
    case RoomQuantityPreference.PACKED:
      return 16;
    case RoomQuantityPreference.MAXIMUM:
      return Infinity;
  }
}