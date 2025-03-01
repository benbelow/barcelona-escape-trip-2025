import { rooms } from '../../data/rooms';
import { QuestionId } from '../../constants/questionIds';
import { HorrorPreference } from '../../constants/horrorTypes';
import { HorrorLevels } from '../../constants/horrorTypes';
import { HorrorTypes } from '../../constants/horrorTypes';
import {RoomQuantityPreference } from '../../constants/roomPreferences';

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
  const allHorrorTypes = Object.values(HorrorTypes);

  // Basic horror level filtering
  if (horrorAppetite === HorrorPreference.NONE 
    && [HorrorLevels.SCARY, HorrorLevels.VERY_SCARY].includes(room.horrorLevel)) return false;

  // Get horror types that user did not select
  const unselectedHorrorTypes = allHorrorTypes.filter(type => !horrorPreferences.includes(type));
  
  // If room contains any unselected horror type, filter it out
  for (const horrorType of unselectedHorrorTypes) {
    if (room.horrorTypes?.includes(horrorType)) return false;
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