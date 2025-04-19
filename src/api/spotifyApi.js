import axios from 'axios';
import { getAccessToken } from './spotifyAuth.js';

const SEARCH_URL = 'https://api.spotify.com/v1/search';

/**
 * Fetches 100 tracks from Spotify and returns them sorted by ascending popularity
 */
export async function fetchLeastPopularTracks() {
  const token = await getAccessToken();
  const response = await axios.get(SEARCH_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      q: 'year:1500-2023',
      type: 'track',
      market: 'US',
      limit: 100,
    },
  });

  const tracks = response.data.tracks.items;
  // Sort by ascending popularity
  tracks.sort((a, b) => a.popularity - b.popularity);
  return tracks;
}

/**
 * Returns a random track from the 100 least popular tracks.
 */
export async function getRandomTrack() {
  const tracks = await fetchLeastPopularTracks();
  const randomIndex = Math.floor(Math.random() * tracks.length);
  return tracks[randomIndex];
} 