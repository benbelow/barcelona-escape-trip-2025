import { rooms } from '../../data/rooms';
import { QuestionId } from '../../constants/questionIds';
import { HorrorPreference } from '../../constants/horrorTypes';
import { HorrorLevels } from '../../constants/horrorTypes';
import { HorrorTypes } from '../../constants/horrorTypes';
import { RoomTier } from '../../constants/roomPreferences';
import { RoomQuantityPreference } from '../../constants/roomPreferences';
import { TravelPreference } from '../../constants/roomProperties';

export const applyPreferences = (answers, excludedRoomIds = []) => {
  const availableRooms = rooms.filter(room => !excludedRoomIds.includes(room.id));
  const filteredRooms = availableRooms.filter(applyPreferenceFilters(answers));
  console.log('Filtered rooms: ', filteredRooms);
  filteredRooms.sort(preferenceSortOperator(answers));
  console.log('Sorted rooms: ', filteredRooms);

  const roomsFilteredByDistance = applyDistanceQuotas(answers, filteredRooms);

  return roomsFilteredByDistance.slice(0, getNumberOfRooms(answers));
}

// Filtering out rooms that actively don't meet criteria
const applyPreferenceFilters = (answers) => {
  return (room) => {
    // Filter by horror preference
    if (!filterByHorrorPreference(answers, room)) return false;

    // Don't filter by travel here - not independent function, but quote of top x matching only

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
  const tierOrder = {
    [RoomTier.TOP_TIER]: 5,
    [RoomTier.BRILLIANT]: 4,
    [RoomTier.VERY_GOOD]: 3,
    [RoomTier.GOOD]: 2,
    [RoomTier.AVERAGE]: 1
  };

  const horrorRank = {
    [HorrorLevels.VERY_SCARY]: 3,
    [HorrorLevels.SCARY]: 2,
    [HorrorLevels.NOT_HORROR]: 1
  };

  // return -ve if a is better, return +ve if b is better
  return (roomA, roomB) => {
    // First check if rooms have any matching properties
    const aMatchCount = roomA.room_properties?.filter(property => roomProperties.includes(property)).length || 0;
    const bMatchCount = roomB.room_properties?.filter(property => roomProperties.includes(property)).length || 0;

    const aHasMatch = aMatchCount > 0;
    const bHasMatch = bMatchCount > 0;

    // If one has matches and other doesn't, prioritize the one with matches
    if (aHasMatch !== bHasMatch) {
      return aHasMatch ? -1 : 1;
    }

    // For rooms with matches, sort by tier first
    if (aHasMatch && bHasMatch) {

      if (roomA.expectedTier !== roomB.expectedTier) {
        return tierOrder[roomB.expectedTier] - tierOrder[roomA.expectedTier];
      }

      // Within same tier, sort by number of matches

      if (aMatchCount !== bMatchCount) {
        return bMatchCount - aMatchCount;
      }
    }

    // Sort by tier
    if (roomA.expectedTier !== roomB.expectedTier) {
      return tierOrder[roomB.expectedTier] - tierOrder[roomA.expectedTier];
    }

    // Then sort by horror level 

    if (answers[QuestionId.HORROR_APPETITE] === HorrorPreference.SEEKING && roomA.horrorLevel !== roomB.horrorLevel) {
      return horrorRank[roomB.horrorLevel] - horrorRank[roomA.horrorLevel];
    }

    if (answers[QuestionId.HORROR_APPETITE] === HorrorPreference.WILL_PLAY && roomA.horrorLevel !== roomB.horrorLevel) {
      return horrorRank[roomA.horrorLevel] - horrorRank[roomB.horrorLevel];
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

const applyDistanceQuotas = (answers, rooms) => {
  const farAwayRoomQuotas = {
    [TravelPreference.LOCAL_ONLY]: 0,
    [TravelPreference.SMALL_TRAVEL]: 2,
    [TravelPreference.AVOID_CARS]: 5,
    [TravelPreference.MULTIPLE_TRAVEL]: 5,
    [TravelPreference.NO_PREFERENCE]: Infinity
  }

  const farAwayThreshold = 40;

  const farAwayRoomQuota = farAwayRoomQuotas[answers[QuestionId.TRAVEL_PREFERENCE]];
  let farAwayRoomCount = 0;

  return rooms.reduce((acc, current) => {
    const isRoomFar = current.minutesByPublicTransport > farAwayThreshold;
    if (!isRoomFar) {
      return [...acc, current];
    }
    else if (farAwayRoomCount >= farAwayRoomQuota) {
      return acc;
    } else {
      farAwayRoomCount++;
      return [...acc, current];
    }
  }, []);

}