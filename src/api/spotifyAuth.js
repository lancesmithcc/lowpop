import axios from 'axios';
// dotenv is loaded globally in server.js

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

let accessToken = null;
let expiresAt = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < expiresAt) {
    return accessToken;
  }

  // Validate credentials
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Spotify Client ID or Secret not configured.');
  }

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  try {
    const response = await axios.post(TOKEN_URL, params, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    accessToken = response.data.access_token;
    expiresAt = now + response.data.expires_in * 1000 - 60000; // renew 1 min before expiry
    return accessToken;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.response?.status);
    throw error;
  }
} 