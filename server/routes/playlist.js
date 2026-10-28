const express = require('express');
const router = express.Router();
const { generatePlaylist } = require('../ai/deepseek');
const {
  extractTrackInfoFromResponse,
  searchSpotifyTracks,
  createSpotifyPlaylist
} = require('../utils/spotifyPlaylist');
const axios = require('axios');

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  const accessToken = req.headers.authorization?.split(' ')[1];

  console.log('📩 Prompt from frontend:', prompt);

  if (!prompt || !accessToken) {
    return res.status(400).json({ message: 'Missing prompt or access token' });
  }

  try {
    const structuredPrompt = `
Create a 10-song playlist for this theme: "${prompt}"

Please format the list exactly like this:
**Artist - Track**
One per line. No additional text, genres, or explanations.
    `;

    const aiResponse = await generatePlaylist(structuredPrompt);
    console.log('\n=== AI RESPONSE ===\n' + aiResponse + '\n==================');

    const trackInfos = extractTrackInfoFromResponse(aiResponse);
    console.log('🎧 Extracted tracks:', trackInfos);

    const userRes = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const userId = userRes.data.id;

    const trackUris = await searchSpotifyTracks(trackInfos, accessToken);

    const playlistUrl = await createSpotifyPlaylist(
      userId,
      `Push’d: ${prompt}`,
      trackUris,
      accessToken
    );

    res.json({
      message: aiResponse,
      playlistUrl
    });
  } catch (error) {
    console.error('❌ Error handling playlist creation:', error.message || error);
    res.status(500).json({ message: 'Failed to create playlist', detail: error.message });
  }
  
});

module.exports = router;
