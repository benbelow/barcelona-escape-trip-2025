import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '../data/main sheet.csv');
const roomsPath = path.join(__dirname, '../data/rooms.js');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
// Skip the first row which is a header about selecting rooms
const records = parse(csvContent, { 
  columns: true,
  from_line: 2, // Skip the first line
  quote: '"',
  escape: '"'
});

// Read the current rooms.js file
const roomsFileContent = fs.readFileSync(roomsPath, 'utf-8');
let roomsModule = roomsFileContent;

// Get the current highest ID from rooms.js
const idRegex = /id:\s*(\d+)/g;
let highestId = 0;
let match;
while ((match = idRegex.exec(roomsFileContent)) !== null) {
  highestId = Math.max(highestId, parseInt(match[1]));
}

// Track rooms not found in rooms.js
const unmatchedRooms = [];

// Helper function to escape regex special characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Helper function to clean string values
const cleanString = (str) => {
  if (!str) return '';
  // Remove any surrounding quotes and trim
  return str.replace(/^["']+|["']+$/g, '').trim();
};

// Helper function to prepare string for JS output
const prepareForJs = (str) => {
  return str.replace(/"/g, '\\"');
};

// Helper function to sanitize description text
const sanitizeText = (str) => {
  if (!str) return '';
  return str
    .replace(/^["']+|["']+$/g, '') // Remove surrounding quotes
    .replace(/"{2,}/g, '"')        // Replace multiple quotes with single
    .replace(/'{2,}/g, "'")        // Replace multiple single quotes with single
    .trim();
};

// Helper function to capitalize first letter
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper function to combine description fields
const createDescription = (record) => {
  const interesting = capitalize(sanitizeText(record['Why is it interesting?']));
  const review = capitalize(sanitizeText(record['Review']));
  
  let parts = [];
  if (interesting) parts.push(interesting);
  if (review) parts.push(`\nReview: ${review}`);
  
  let description = parts.join('. ').replace(/\.\./g, '.');
  
  // Final cleanup and escaping
  return description
    .replace(/["']{2,}/g, '"')     // Replace multiple quotes with single
    .replace(/"/g, '\\"')          // Escape remaining quotes
    .replace(/\s+/g, ' ')          // Normalize whitespace except for our intentional newlines
    .replace(/ *\n */g, '\n')      // Clean up spaces around newlines
    .trim();
};

// Helper function to create a new room object
const createNewRoom = (record, id) => {
  const description = createDescription(record);
  const horrorLevel = record['Scary?']?.toLowerCase().includes('yes') ? 
    'HorrorLevels.SCARY' : 
    'HorrorLevels.NOT_HORROR';
  
  const name = prepareForJs(cleanString(record.Name));
  const company = prepareForJs(cleanString(record.Company));
  const theme = prepareForJs(cleanString(record.Theme));
  const location = prepareForJs(cleanString(record.Town) || 'Barcelona');
  
  return `  {
    id: ${id},
    name: "${name}",
    company: "${company}",
    theme: "${theme}",
    description: "${description}",
    horrorLevel: ${horrorLevel},
    horrorTypes: [],
    room_properties: [],
    expectedTier: RoomTier.AVERAGE,
    imageUrl: "",
    location: "${location}",
    terpeca2024: ${record.TERPECA2024 || 'null'},
    minutesByCar: null,
    minutesByPublicTransport: null
  }`;
};

// Update each room in the rooms array
records.forEach(record => {
  const roomName = cleanString(record.Name);
  if (!roomName) return;

  // Update the room in the rooms.js file
  const escapedRoomName = escapeRegExp(roomName);
  const roomRegex = new RegExp(`{[^}]*name:\\s*["']${escapedRoomName}["'][^}]*}`, 'g');
  const roomMatch = roomsFileContent.match(roomRegex);

  if (roomMatch) {
    let updatedRoom = roomMatch[0];

    // Update description combining both fields
    const description = createDescription(record);
    if (description) {
      updatedRoom = updatedRoom.replace(
        /description:\s*"((?:\\"|[^"])*?)"/,
        `description: "${description}"`
      );
    }

    // Update TERPECA ranking
    if (record.TERPECA2024) {
      updatedRoom = updatedRoom.replace(
        /terpeca2024:\s*[^,]*/,
        `terpeca2024: ${record.TERPECA2024}`
      );
    }

    roomsModule = roomsModule.replace(roomMatch[0], updatedRoom);
  } else {
    unmatchedRooms.push(record);
  }
});

// Add new rooms
if (unmatchedRooms.length > 0) {
  // Find the closing bracket of the rooms array
  const lastBracketIndex = roomsModule.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const newRooms = unmatchedRooms.map((record, index) => {
      return createNewRoom(record, highestId + index + 1);
    }).join(',\n');

    // Insert the new rooms before the closing bracket
    roomsModule = roomsModule.slice(0, lastBracketIndex) + 
      (roomsModule[lastBracketIndex - 1] === '}' ? ',\n' : '') +
      newRooms + 
      roomsModule.slice(lastBracketIndex);
  }
}

// Write the updated content back to rooms.js
fs.writeFileSync(roomsPath, roomsModule, 'utf-8');

console.log('Successfully updated rooms.js with main sheet data');
if (unmatchedRooms.length > 0) {
  console.log('\nAdded the following new rooms:');
  unmatchedRooms.forEach(room => console.log(`- ${room.Name}`));
}
