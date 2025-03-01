import { rooms } from '../../data/rooms';
import { QuestionId } from '../../constants/questionIds';
import { HorrorPreference } from '../../constants/horrorTypes';
import { HorrorLevels } from '../../constants/horrorTypes';
import { HorrorTypes } from '../../constants/horrorTypes';
import { RoomTier } from '../../constants/roomPreferences';

import { RoomQuantityPreference } from '../../constants/roomPreferences';

export const applyPreferences = (answers) => {
  const filteredRooms = rooms.filter(applyPreferenceFilters(answers));
  console.log('Filtered rooms: ', filteredRooms);
  filteredRooms.sort(preferenceSortOperator(answers));
  console.log('Sorted rooms: ', filteredRooms);
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
  const roomProperties = answers[QuestionId.ROOM_PROPERTIES] || [];

  // return -ve if a is better, return +ve if b is better
  return (roomA, roomB) => {
    // Sort by matching room properties first
    const aHasMatchingProperty = roomProperties.some(property => roomA.room_properties?.includes(property));
    const bHasMatchingProperty = roomProperties.some(property => roomB.room_properties?.includes(property));

    if (aHasMatchingProperty !== bHasMatchingProperty) {
      return aHasMatchingProperty ? -1 : 1;
    }

    // Then sort by tier
    const tierOrder = {
      [RoomTier.TOP_TIER]: 5,
      [RoomTier.BRILLIANT]: 4,
      [RoomTier.VERY_GOOD]: 3,
      [RoomTier.GOOD]: 2,
      [RoomTier.AVERAGE]: 1
    };

    if (roomA.expectedTier !== roomB.expectedTier) {
      return tierOrder[roomB.expectedTier] - tierOrder[roomA.expectedTier];
    }

    // Then sort by horror level 
    const horrorRank = {
      [HorrorLevels.VERY_SCARY]: 3,
      [HorrorLevels.SCARY]: 2,
      [HorrorLevels.NOT_HORROR]: 1
    };

    if (answers[QuestionId.HORROR_APPETITE] === HorrorPreference.SEEKING && roomA.horrorLevel !== roomB.horrorLevel) {
      return horrorRank[roomB.horrorLevel] - horrorRank[roomA.horrorLevel];
    }

    // Then sort by TERPECA 2024 rank 
    if (roomA.terpeca2024 !== roomB.terpeca2024) {
      return (roomA.terpeca2024 || 9999) - (roomB.terpeca2024 || 9999);
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