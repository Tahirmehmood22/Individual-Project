
// Import and initialize dependencies (ES module syntax)
import express from 'express';
import fs from 'fs';
import cors from 'cors';
const app = express();
const PORT = 4000;
const DATA_FILE = './server/playerData.json';

app.use(cors());
app.use(express.json());

// Load player data from file or use default
function loadPlayerData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return {
      name: 'Alex Johnson',
      age: 9,
      dateOfBirth: '2015-03-15',
      height: '130 cm',
      weight: '28 kg',
      location: 'Stockholm, Sweden',
      level: 'Rising Star',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      skills: {
        smash: 7,
        serve: 6,
        footwork: 8,
        drop: 5,
        net: 6
      },
      achievements: [
        'First Tournament',
        'Best Serve 2025',
        'Junior League Finalist',
        'Most Improved Player 2024'
      ],
      scheduledTrainings: [
        { "date": "2025-09-05", "details": "Endurance drills and footwork practice." },
        { "date": "2025-09-10", "details": "Smash technique and net play session." }
      ],
      practiceSessions: [
        { "date": "2025-08-28", "notes": "Practiced drop shots and improved accuracy." },
        { "date": "2025-08-30", "notes": "Worked on serve consistency and speed." }
      ],
      competitionResults: [
        { "date": "2025-08-15", "event": "Junior League Finals", "result": "2nd Place" },
        { "date": "2025-07-20", "event": "Summer Open", "result": "Quarterfinals" }
      ]
    };
  }
}

// ...existing code...

// ...existing code...

// Start the Express server (should be last line in the file)
app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
