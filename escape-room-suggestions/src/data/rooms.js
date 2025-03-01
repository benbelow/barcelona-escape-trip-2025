import { HorrorLevels, HorrorPreference, HorrorTypes } from "../constants/horrorTypes";
import { RoomTier } from "../constants/roomPreferences";

export const rooms = [
  {
    id: 1,
    name: "KONG Protocol",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_KONGProtocol.jpg"
  },
  {
    id: 2,
    name: "La Taberna",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_LaTaberna.jpg"
  },
  {
    id: 3,
    name: "Tao Japanese Massage Center",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "CyberCity 2049",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Outline",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.BEING_CHASED, HorrorTypes.JUMP_SCARES, HorrorTypes.DARK_THEMES],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://images.unsplash.com/photo-1596633607590-7156877ef734?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "NightShift",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.BEING_CHASED, HorrorTypes.JUMP_SCARES, HorrorTypes.DARK_THEMES],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Jurasico",
    theme: "",
    description: "",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=800&auto=format&fit=crop"
  }
];
