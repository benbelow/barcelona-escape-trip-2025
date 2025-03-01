export const RoomQuantityPreference = {
  BEST_ONLY: 'bestOnly',
  FOCUSED: 'focused',
  PACKED: 'packed',
  MAXIMUM: 'maximum'
};

export const RoomQuantityLabels = {
  [RoomQuantityPreference.BEST_ONLY]: "Just the best rooms",
  [RoomQuantityPreference.FOCUSED]: "Escape-room focussed, but not too intense",
  [RoomQuantityPreference.PACKED]: "Fairly packed",
  [RoomQuantityPreference.MAXIMUM]: "As many as possible. Bring 'em on!"
};

export const RoomTier = {
  // Top few rooms in Barcelona
  TOP_TIER: 'topTier',
  // Probably TERPECA winners
  BRILLIANT: 'brilliant',
  // Probably TERPECA finalists
  VERY_GOOD: 'veryGood',
  // Solid games
  GOOD: 'good',
  // Average games
  AVERAGE: 'average'
};