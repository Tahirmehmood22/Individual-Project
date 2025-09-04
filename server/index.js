// Simple Express.js mock backend for your project
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());


// In-memory player data
let playerData = {
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
  ]
};

// GET player data
app.get('/api/player', (req, res) => {
  res.json(playerData);
});


// PUT update player data
app.put('/api/player', (req, res) => {
  playerData = { ...playerData, ...req.body };
  res.json({ success: true, player: playerData });
});

// DELETE player data
app.delete('/api/player', (req, res) => {
  playerData = null;
  res.json({ success: true });
});

// POST create new player profile
app.post('/api/player', (req, res) => {
  playerData = { ...req.body };
  res.json({ success: true, player: playerData });
});

// Add more endpoints as needed

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
