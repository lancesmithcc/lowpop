// Load .env file at the very beginning
import dotenv from 'dotenv';
dotenv.config({ debug: true }); // Load .env from root, enable debug

// Log IMMEDIATELY after dotenv.config()
console.log('[Server Start Debug] process.env.SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID);
console.log('[Server Start Debug] process.env.SPOTIFY_CLIENT_SECRET loaded:', !!process.env.SPOTIFY_CLIENT_SECRET);

import express from 'express';
import cors from 'cors';
import { getRandomTrack } from './api/spotifyApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint called');
  res.json({ message: 'API is working' });
});

// Endpoint to fetch a random least popular track
app.get('/api/random-track', async (req, res) => {
  try {
    console.log('Fetching random track...');
    const track = await getRandomTrack();
    console.log('Track fetched successfully:', track.name);
    res.json(track);
  } catch (err) {
    console.error('Error fetching random track:', err);
    res.status(500).json({ error: 'Failed to fetch random track', details: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 