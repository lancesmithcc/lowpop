import axios from 'axios';
// dotenv is now loaded globally in server.js

// --- REMOVED LOGGING as it's now in server.js ---

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

let accessToken = null;
let expiresAt = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < expiresAt) {
    console.log('[Auth Debug] Using cached access token.');
    return accessToken;
  }

  // --- Logging remains here to check values just before API call ---
  console.log(`[Auth Debug] Attempting to fetch new token. Using Client ID: ${CLIENT_ID}`);
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('[Auth Debug] ERROR: Client ID or Secret is missing in environment variables!');
    // Log the actual values seen here for extra debug
    console.error(`[Auth Debug] Actual CLIENT_ID: ${CLIENT_ID}`);
    console.error(`[Auth Debug] Actual CLIENT_SECRET exists: ${!!CLIENT_SECRET}`);
    throw new Error('Spotify Client ID or Secret not configured.');
  }
  // --- END LOGGING ---

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  console.log(`[Auth Debug] Generated Auth Header starts with: Basic ${authHeader.substring(0, 10)}...`); 
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
    expiresAt = now + response.data.expires_in * 1000 - 60000;
    console.log('[Auth Debug] New access token fetched successfully.');
    return accessToken;
  } catch (error) {
    console.error('[Auth Debug] Error fetching access token from Spotify:', error.response?.status, error.response?.data || error.message);
    throw error; // Re-throw the error to be caught by the caller
  }
} 