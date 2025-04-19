import axios from 'axios';
import * as auth from '../api/spotifyAuth.js';
import * as api from '../api/spotifyApi.js';

jest.mock('axios');

describe('Spotify Authentication', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  test('getAccessToken fetches and caches token', async () => {
    axios.post.mockResolvedValue({ data: { access_token: 'test_token', expires_in: 1000 } });
    const token1 = await auth.getAccessToken();
    expect(axios.post).toHaveBeenCalledWith(
      'https://accounts.spotify.com/api/token',
      expect.any(URLSearchParams),
      expect.objectContaining({ headers: expect.any(Object) })
    );
    expect(token1).toBe('test_token');

    // Call again should use cached token and not POST again
    axios.post.mockClear();
    const token2 = await auth.getAccessToken();
    expect(axios.post).not.toHaveBeenCalled();
    expect(token2).toBe('test_token');
  });
});

describe('Spotify API', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  test('fetchLeastPopularTracks sorts tracks by ascending popularity', async () => {
    jest.spyOn(auth, 'getAccessToken').mockResolvedValue('fake_token');
    const items = [ { popularity: 50 }, { popularity: 10 }, { popularity: 30 } ];
    axios.get.mockResolvedValue({ data: { tracks: { items } } });

    const sorted = await api.fetchLeastPopularTracks();
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.spotify.com/v1/search',
      expect.objectContaining({ headers: { Authorization: 'Bearer fake_token' }, params: expect.any(Object) })
    );
    expect(sorted.map(t => t.popularity)).toEqual([10, 30, 50]);
  });

  test('getRandomTrack returns one of the fetched tracks', async () => {
    const sample = [ { id: 'a' }, { id: 'b' }, { id: 'c' } ];
    jest.spyOn(api, 'fetchLeastPopularTracks').mockResolvedValue(sample);
    const choice = await api.getRandomTrack();
    expect(sample).toContainEqual(choice);
  });
}); 