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
  ESSENTIAL: 1,
  RECOMMENDED: 2,
  OPTIONAL: 3,
  EXTRA: 4
};

// Maps quantity preferences to room tiers
export const PreferenceToTierMap = {
  [RoomQuantityPreference.BEST_ONLY]: RoomTier.ESSENTIAL,
  [RoomQuantityPreference.FOCUSED]: RoomTier.RECOMMENDED,
  [RoomQuantityPreference.PACKED]: RoomTier.OPTIONAL,
  [RoomQuantityPreference.MAXIMUM]: RoomTier.EXTRA
};
