// Load .env file at the very beginning
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getRandomTrack } from './api/spotifyApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // Allow requests from the deployed frontend
}));
app.use(express.json());

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Endpoint to fetch a random least popular track
app.get('/api/random-track', async (req, res) => {
  try {
    const track = await getRandomTrack();
    res.json(track);
  } catch (err) {
    console.error('Error fetching random track:', err.message);
    res.status(500).json({ error: 'Failed to fetch random track', details: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 