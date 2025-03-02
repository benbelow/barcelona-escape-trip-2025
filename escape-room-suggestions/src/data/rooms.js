import { HorrorLevels, HorrorTypes } from "../constants/horrorTypes";
import { RoomTier } from "../constants/roomPreferences";
import { RoomProperties } from "../constants/roomProperties";

export const rooms = [
  {
    id: 1,
    name: "La Taberna",
    company: "The City Escape Room",
    theme: "Medieval tavern",
    description: "One of the best rooms. Grandiose, bombastic, great effects. La Taberna keeps building in spectacle and wonder, with fantastic gameplay alongside mindblowing discovery.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS, RoomProperties.GREAT_SET, RoomProperties.SPECTACLE],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_LaTaberna.jpg",
    location: "Terrassa",
    terpeca2024: 5,
    minutesByCar: 28,
    minutesByPublicTransport: 89
  },
  {
    id: 2,
    name: "K.O.N.G. Protocol",
    company: "Escape Barcelona",
    theme: "King Kong",
    description: "One of the best 4 games.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS, RoomProperties.GREAT_SET, RoomProperties.SPECTACLE, RoomProperties.IMMERSIVE],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_KONGProtocol.jpg",
    location: "Santa Coloma de Gramenet",
    terpeca2024: 10,
    minutesByCar: 22,
    minutesByPublicTransport: 30
  },
  {
    id: 3,
    name: "Cybercity 2049",
    company: "Escape Barcelona",
    theme: "Cyberpunk",
    description: "One of the best rooms. Incredible cyberpunk game with deep gameplay. An exciting and breathtaking experience - you feel like a character in a real life video game! A thrilling combination of smart puzzles, gorgeous scenarios, technology, fun interaction and adrenaline!",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS, RoomProperties.GREAT_SET, RoomProperties.SPECTACLE, RoomProperties.IMMERSIVE],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_CyberCity2049.png",
    location: "Santa Coloma de Gramenet",
    terpeca2024: 29,
    minutesByCar: 22,
    minutesByPublicTransport: 30
  },
  {
    id: 4,
    name: "Outline",
    company: "Outline Escape Room",
    theme: "Industrial Horror",
    description: "Expansive, intensely scary, cinematic. Good puzzles. \"I haven't slept since.\"",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES, HorrorTypes.BEING_CHASED],
    room_properties: [RoomProperties.PUZZLE_FOCUSED, RoomProperties.ACTORS],
    expectedTier: RoomTier.TOP_TIER,
    imageUrl: "https://terpeca.com/images/rooms/Room_Outline.jpg",
    location: "Cornella de Llobregat",
    terpeca2024: 35,
    minutesByCar: 24,
    minutesByPublicTransport: 39
  },
  {
    id: 5,
    name: "Nightshift",
    company: "Unreal Room Escape",
    theme: "Hospital Horror",
    description: "Very scary",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_NightShift.jpg",
    location: "Sabadell",
    terpeca2024: 40,
    minutesByCar: 20,
    minutesByPublicTransport: 30
  },
  {
    id: 6,
    name: "Posesion",
    company: "Arcanum",
    theme: "Demonic",
    description: "Has the best intro. La Posesion is the kind of room that proves that you can have at the same time great acting and horror effects, pretty decors, interesting puzzles, surprises at every corner and beauty all around!",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.BEING_CHASED, HorrorTypes.DARK_THEMES],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_LaPosesion.jpg",
    location: "Sant Sadurni D'Anoia",
    terpeca2024: 43,
    minutesByCar: 50,
    minutesByPublicTransport: 91
  },
  {
    id: 7,
    name: "Poison",
    company: "Kadabra Escape",
    theme: "Batman Villains",
    description: "Joyous celebration of Batman villainy. What a surprise! You can feel the passion of the creators in this room! The settings are magnificent! The puzzles are truly superb!",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_Poison.jpg",
    location: "Barcelona",
    terpeca2024: 47,
    minutesByCar: 28,
    minutesByPublicTransport: 49
  },
  {
    id: 8,
    name: "Jurasico",
    company: "Golden Pop",
    theme: "Dinosaurs",
    description: "Bring the movie to life, good room design",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.SPECTACLE, RoomProperties.IMMERSIVE, RoomProperties.GREAT_SET, RoomProperties.ACTORS, RoomProperties.PHYSICAL],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_Jurassic.jpg", location: "Barcelona",
    terpeca2024: 51,
    minutesByCar: 6,
    minutesByPublicTransport: 2
  },
  {
    id: 9,
    name: "La Casa",
    company: "Insomnium Corporation",
    theme: "Haunted House",
    description: "Only limited people can do due to remote location. Car-dependent. You are in the movie…for real! From the location until the acting just perfect.",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES],
    room_properties: [RoomProperties.NOVEL, RoomProperties.SPECTACLE, RoomProperties.IMMERSIVE, RoomProperties.ACTORS],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_LaCasa.png",
    location: "Berga",
    terpeca2024: 62,
    minutesByCar: 75,
    minutesByPublicTransport: 159
  },
  {
    id: 10,
    name: "11S",
    company: "Open Mind Room Escape",
    theme: "9/11 Memorial",
    description: "Grimly beautiful, painfully engrossing, sincere yet flawed. After 1500 escape rooms, first escape ever where I cried… because of the story… I was afraid about the 11S topic, but Open Mind has been able to respectfully recreate that story, and the ending is very touching.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL, RoomProperties.ACTORS],
    expectedTier: RoomTier.GOOD,
    imageUrl: "https://terpeca.com/images/rooms/Room_11s.jpg",
    location: "Cornella de Llobregat",
    terpeca2024: 68,
    minutesByCar: 9,
    minutesByPublicTransport: 14
  },
  {
    id: 11,
    name: "Distrito 111",
    company: "Unreal Room Escape",
    theme: "Post-apocalyptic",
    description: "'Yes and' storytelling, like being in a video game. I can't believe I was allowed to do that in an escape room!!! Best use of 'Yes and' storytelling to curate an absolutely mind-blowing experience.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL, RoomProperties.IMMERSIVE, RoomProperties.GREAT_SET],
    expectedTier: RoomTier.VERY_GOOD,
    imageUrl: "https://terpeca.com/images/rooms/Room_Distrito111.jpg",
    location: "Barcelona",
    terpeca2024: 86,
    minutesByCar: 20,
    minutesByPublicTransport: 30
  },
  {
    id: 12,
    name: "Tao Japanese Massage Centre",
    company: "Virus Room Escape",
    theme: "Japanese Massage",
    description: "One of the best 4 games. Ice-Tiki like lightheartedness. Kimono is mandatory. If you play escape rooms to have fun, this is it. Fun, light-hearted and it leaves you with a smile.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL, RoomProperties.COMEDY],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://terpeca.com/images/rooms/Room_TaoRoomEscape.png",
    location: "Calella de Mar",
    terpeca2024: 94,
    minutesByCar: 45,
    minutesByPublicTransport: 85
  },
  {
    id: 13,
    name: "La Cerveseria",
    company: "Enigmik",
    theme: "Brewery",
    description: "Great set + has beer. Near Sagrada Familia. A masterclass in slick, sleek puzzle design that just flows.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.PUZZLE_FOCUSED],
    expectedTier: RoomTier.VERY_GOOD,
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/19/83/fc/57/4-a-6-jugadores-80-minutos.jpg",
    location: "Barcelona",
    terpeca2024: 102,
    minutesByCar: 14,
    minutesByPublicTransport: 25
  },
  {
    id: 14,
    name: "Josep Fontcalda House Museum",
    company: "1801 Escape Rooms",
    theme: "Carpentry Museum",
    description: "This game was built by hand by one carpenter, and you'll never see wood craftsmanship of mechanical puzzling quite like this.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL],
    expectedTier: RoomTier.VERY_GOOD,
    imageUrl: "https://example.com/fontcalda.jpg",
    location: "Barcelona",
    terpeca2024: 106,
    minutesByCar: 55,
    minutesByPublicTransport: 121
  },
  {
    id: 15,
    name: "Malum",
    company: "Krematorium Escape Rooms",
    theme: "Horror",
    description: "Very cinematic lighting / design. Oh wow, the lighting to create terror is awesome.",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.JUMP_SCARES, HorrorTypes.DARK_THEMES],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.VERY_GOOD,
    imageUrl: "https://example.com/malum.jpg",
    location: "Barcelona",
    terpeca2024: 116,
    minutesByCar: 24,
    minutesByPublicTransport: 36
  },
  {
    id: 16,
    name: "Criogenic",
    company: "Unknown",
    theme: "Cryogenics",
    description: "Well rated game in Madrid. Think it's been/being ported to Barcelona, opening early 2025",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.VERY_GOOD,
    imageUrl: "https://example.com/criogenic.jpg",
    location: "Barcelona",
    terpeca2024: 125
  },
  {
    id: 17,
    name: "Inmortum 2",
    company: "Hostal83",
    theme: "Horror Comedy",
    description: "These guys are absolutely amazing in terms of creating original and never seen games. They also make you laugh in their rooms, even if those are scary ones. Don't let them stop creating!",
    horrorLevel: HorrorLevels.SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES],
    room_properties: [RoomProperties.COMEDY, RoomProperties.ACTORS],
    expectedTier: RoomTier.GOOD,
    imageUrl: "https://example.com/inmortum2.jpg",
    location: "Gironella",
    terpeca2024: 141,
    minutesByCar: 70,
    minutesByPublicTransport: 124
  },
  {
    id: 18,
    name: "Game-on",
    company: "La Clau Escape Room",
    theme: "Battle Royale",
    description: "Competitive",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/gameon.jpg",
    location: "Manresa",
    terpeca2024: 177,
    minutesByCar: 55,
    minutesByPublicTransport: 106
  },
  {
    id: 19,
    name: "Odisea Cel-lular",
    company: "Can Bruna",
    theme: "Human Body",
    description: "Old lady interior organ escape room. You can propose in it.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL, RoomProperties.ACTORS],
    expectedTier: RoomTier.GOOD,
    imageUrl: "https://example.com/odisea.jpg",
    location: "Vilafranca",
    terpeca2024: 195,
    minutesByCar: 50,
    minutesByPublicTransport: 88
  },
  {
    id: 20,
    name: "Whitechapel",
    company: "Whitechapel Room Escape",
    theme: "Horror",
    description: "Some very cool, physical moments. Wesall says it's the most scared he's been in a room. Safewording etc seems pretty good. Very physical, very terrifying, Wesall calls it his number 1 most scary game. Probably not for arachnophobes (no real spiders)",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES, HorrorTypes.BEING_CHASED],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/whitechapel.jpg",
    location: "Barcelona",
    terpeca2024: 198,
    minutesByCar: 20,
    minutesByPublicTransport: 31
  },
  {
    id: 21,
    name: "Nakatomi Plaza",
    company: "Escape Republik",
    theme: "Die Hard",
    description: "Great host, good Die Hard experience",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/nakatomi.jpg",
    location: "Barcelona",
    terpeca2024: 239,
    minutesByCar: 24,
    minutesByPublicTransport: 30
  },
  {
    id: 22,
    name: "Bermuda",
    company: "Final Code",
    theme: "Bermuda Triangle",
    description: "Good set",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/bermuda.jpg",
    location: "Barcelona",
    terpeca2024: 271,
    minutesByCar: 22,
    minutesByPublicTransport: 31
  },
  {
    id: 23,
    name: "Abduction 3",
    company: "Abduction",
    theme: "Exam",
    description: "Physical challenges, exam-based. Spooky.",
    horrorLevel: HorrorLevels.SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES],
    room_properties: [RoomProperties.TASK_FOCUSED, RoomProperties.NOVEL, RoomProperties.PHYSICAL],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/abduction3.jpg",
    location: "Badaluna",
    terpeca2024: 274,
    minutesByCar: 18,
    minutesByPublicTransport: 58
  },
  {
    id: 24,
    name: "Tomb Hunter Akasha's Legend",
    company: "Escape Barcelona",
    theme: "Adventure",
    description: "Physical, good. That premise could be an action movie, and this is an action movie of a game. You really feel like you're exploring Indiana Jones style, with all the physicality that implies: climbing and scrambling and dealing with booby traps.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS, RoomProperties.IMMERSIVE],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/tombhunter.jpg",
    location: "Santa Coloma de Gramenet",
    terpeca2024: 284,
    minutesByCar: 18,
    minutesByPublicTransport: 33
  },
  {
    id: 25,
    name: "Kidnapped",
    company: "Kidnapped in BCN",
    theme: "Kidnapping",
    description: "Site seems funny",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.ACTORS, RoomProperties.COMEDY],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/kidnapped.jpg",
    location: "Barcelona",
    terpeca2024: 292,
    minutesByCar: 22,
    minutesByPublicTransport: 28
  },
  {
    id: 26,
    name: "Forgotten Tomb",
    company: "Misterios de Kemet",
    theme: "Egyptian Tomb",
    description: "Realistic tomb-themed room",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/forgottentomb.jpg",
    location: "Barcelona",
    terpeca2024: 302,
    minutesByCar: 30,
    minutesByPublicTransport: 38
  },
  {
    id: 27,
    name: "Abduction 4",
    company: "Abduction",
    theme: "Batman",
    description: "Batman, physical challenges",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/abduction4.jpg",
    location: "Badaluna",
    terpeca2024: 306,
    minutesByCar: 18,
    minutesByPublicTransport: 58
  },
  {
    id: 28,
    name: "Alien Origin",
    company: "City Escape Room",
    theme: "Alien",
    description: "It's by people we're a fan of",
    horrorLevel: HorrorLevels.SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/alienorigin.jpg",
    location: "Barcelona",
    terpeca2024: 350,
    minutesByCar: 18,
    minutesByPublicTransport: 33
  },
  {
    id: 29,
    name: "Catacombs",
    company: "Golden Pop",
    theme: "Indiana Jones",
    description: "Designed like being in a movie, some expensive set design. I loved the decoration. I loved the special effects. I loved the lighting. I loved the music and sound effects. I loved the riddles. And I loved both the beginning and the ending.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/catacombs.jpg",
    location: "Barcelona",
    terpeca2024: 351,
    minutesByCar: 6,
    minutesByPublicTransport: 2
  },
  {
    id: 30,
    name: "Cooking Academy",
    company: "The City Escape Room",
    theme: "Cooking",
    description: "4 team Overcooked-like",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.TASK_FOCUSED],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/cookingacademy.jpg",
    location: "Barcelona",
    terpeca2024: 358,
    minutesByCar: 28,
    minutesByPublicTransport: 89
  },
  {
    id: 31,
    name: "Exodus",
    company: "Elements Escape Room",
    theme: "Apocalypse",
    description: "Very highly rated, shiny and new. Expect to be 30-75 in TERPECA 2025",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.GREAT_SET, RoomProperties.IMMERSIVE, RoomProperties.SPECTACLE],
    expectedTier: RoomTier.BRILLIANT,
    imageUrl: "https://example.com/exodus.jpg",
    location: "Barcelona",
    terpeca2024: null,
    minutesByCar: 18,
    minutesByPublicTransport: 24
  },
  {
    id: 32,
    name: "Roomions",
    company: "Virus Room Escape",
    theme: "Minions",
    description: "It's Minions-themed",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.COMEDY, RoomProperties.ACTORS],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_N8NXaoWYR0XNsiyTaOCc7qCCmaBP5AHkRA&s",
    location: "Calella de Mar",
    terpeca2024: null,
    minutesByCar: 45,
    minutesByPublicTransport: 85
  },
  {
    id: 33,
    name: "Hater",
    company: "Hostal83",
    theme: "Party Game",
    description: "Room is a cross between Among Us and Mario Party. Large groups recommended. Hater is not an Escape Game that impresses with a great scenery – many of the puzzles and tasks are rather simple in construction – BUT, if you are up for an unusual and fast-paced challenge, in which there is a lot to laugh about, you will get your money's worth in this game.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/hater.jpg",
    location: "Gironella",
    terpeca2024: null,
    minutesByCar: 70,
    minutesByPublicTransport: 124
  },
  {
    id: 34,
    name: "Blasphemia",
    company: "Cindy Box",
    theme: "Religious Horror",
    description: "Highly ranked by Escape Roomers",
    horrorLevel: HorrorLevels.VERY_SCARY,
    horrorTypes: [HorrorTypes.DARK_THEMES, HorrorTypes.JUMP_SCARES],
    room_properties: [RoomProperties.NOVEL, RoomProperties.SPECTACLE, RoomProperties.IMMERSIVE, RoomProperties.ACTORS],
    expectedTier: RoomTier.GOOD,
    imageUrl: "https://example.com/blasphemia.jpg",
    location: "Barcelona",
    terpeca2024: null,
    minutesByCar: 55,
    minutesByPublicTransport: 128
  },
  {
    id: 35,
    name: "Keops Space Project",
    company: "Keops",
    theme: "Ancient Egypt In Space",
    description: "Very little info. One person's favourite room. 3 hours long, quite video-gamey and different.",
    horrorLevel: HorrorLevels.NOT_HORROR,
    horrorTypes: [],
    room_properties: [RoomProperties.NOVEL],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "https://example.com/exodus.jpg",
    location: "Barcelona",
    terpeca2024: null,
    minutesByCar: 120,
    minutesByPublicTransport: 106
  }
];
