import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '../data/Escape room CSV - Sheet1.csv');
const roomsPath = path.join(__dirname, '../data/rooms.js');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, { columns: true });

// Read the current rooms.js file
const roomsFileContent = fs.readFileSync(roomsPath, 'utf-8');
let roomsModule = roomsFileContent;

// Helper function to convert CSV 'y'/'n' to boolean
const csvBoolToBoolean = (value) => value === 'y';

// Map CSV columns to room properties
const propertyMapping = {
  actors: 'ACTORS',
  immersive: 'IMMERSIVE',
  set: 'GREAT_SET',
  spectacle: 'SPECTACLE',
  comedy: 'COMEDY',
  novel: 'NOVEL',
  puzzley: 'PUZZLE_FOCUSED',
  tasky: 'TASK_FOCUSED',
  videogamey: 'VIDEO_GAME_STYLE',
  competitive: 'COMPETITIVE'
};

// Map CSV columns to horror types
const horrorTypeMapping = {
  jumpscares: 'JUMP_SCARES',
  chase: 'BEING_CHASED',
  dark: 'DARK_THEMES',
  gore: 'GORE'
};

// Track rooms not found in rooms.js
const unmatchedRooms = [];

// Update each room in the rooms array
records.forEach(record => {
  const roomName = record.Name;
  if (!roomName) return;

  // Create the room properties array
  const newProperties = [];
  Object.entries(propertyMapping).forEach(([csvKey, propKey]) => {
    if (csvBoolToBoolean(record[csvKey])) {
      newProperties.push(`RoomProperties.${propKey}`);
    }
  });

  // Create the horror types array
  const horrorTypes = [];
  Object.entries(horrorTypeMapping).forEach(([csvKey, typeKey]) => {
    if (csvBoolToBoolean(record[csvKey])) {
      horrorTypes.push(`HorrorTypes.${typeKey}`);
    }
  });

  // Update the room in the rooms.js file
  const roomRegex = new RegExp(`{[^}]*name:\\s*["']${roomName}["'][^}]*}`, 'g');
  const roomMatch = roomsFileContent.match(roomRegex);

  if (roomMatch) {
    let updatedRoom = roomMatch[0];

    // Update TERPECA ranking
    if (record.TERPECA2024) {
      updatedRoom = updatedRoom.replace(
        /terpeca2024:\s*\d+/,
        `terpeca2024: ${record.TERPECA2024}`
      );
    }

    // Add new properties while preserving existing ones
    if (newProperties.length > 0) {
      const existingPropsMatch = updatedRoom.match(/room_properties:\s*\[(.*?)\]/);
      if (existingPropsMatch) {
        const existingProps = existingPropsMatch[1].split(',').map(p => p.trim()).filter(p => p);
        const combinedProps = [...new Set([...existingProps, ...newProperties])];
        updatedRoom = updatedRoom.replace(
          /room_properties:\s*\[[^\]]*\]/,
          `room_properties: [${combinedProps.join(', ')}]`
        );
      }
    }

    // Update horror types while preserving existing ones
    if (horrorTypes.length > 0) {
      const existingTypesMatch = updatedRoom.match(/horrorTypes:\s*\[(.*?)\]/);
      if (existingTypesMatch) {
        const existingTypes = existingTypesMatch[1].split(',').map(t => t.trim()).filter(t => t);
        const combinedTypes = [...new Set([...existingTypes, ...horrorTypes])];
        updatedRoom = updatedRoom.replace(
          /horrorTypes:\s*\[[^\]]*\]/,
          `horrorTypes: [${combinedTypes.join(', ')}]`
        );
      }
    }

    // Update horror level if horror is marked in CSV and current level is NOT_HORROR
    if (csvBoolToBoolean(record.horror)) {
      const currentHorrorLevel = updatedRoom.match(/horrorLevel:\s*HorrorLevels\.([^,]*)/);
      if (currentHorrorLevel && currentHorrorLevel[1] === 'NOT_HORROR') {
        updatedRoom = updatedRoom.replace(
          /horrorLevel:\s*HorrorLevels\.[^,]*/,
          'horrorLevel: HorrorLevels.SCARY'
        );
      }
    }

    // Update expectedTier based on top4
    if (record.top4 === 'y') {
      updatedRoom = updatedRoom.replace(
        /expectedTier:\s*RoomTier\.[^,]*/,
        'expectedTier: RoomTier.TOP_TIER'
      );
    }

    roomsModule = roomsModule.replace(roomMatch[0], updatedRoom);
  } else {
    unmatchedRooms.push(roomName);
  }
});

// Write the updated content back to rooms.js
fs.writeFileSync(roomsPath, roomsModule, 'utf-8');

console.log('Successfully updated rooms.js with CSV data');
if (unmatchedRooms.length > 0) {
  console.log('\nRooms from CSV not found in rooms.js:');
  unmatchedRooms.forEach(room => console.log(`- ${room}`));
}
