const express = require('express');
const axios = require('axios');
const router = express.Router();

// Because auth.js is in the routes folder, we use ../ to go up one level into config
const db = require('../config/db');

const FRONTEND_URL = 'http://localhost:3000';

// Route to redirect users to Spotify's authorization page
router.get('/login', (req, res) => {
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ');

  const redirectUri = 'http://localhost:3001/api/auth/callback';

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?` +
    `client_id=${process.env.SPOTIFY_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}`;

  res.redirect(spotifyAuthUrl);
});

// Callback route to handle Spotify's response and exchange code for tokens
router.get('/callback', async (req, res) => {
  const code = req.query.code;
  const redirectUri = 'http://localhost:3001/api/auth/callback';

  try {
    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')
        }
      }
    );

    const { access_token, refresh_token } = tokenRes.data;

    // Optionally, you can store these tokens in your database using the db module

    // Redirect back to your frontend with tokens in the query parameters (for demo purposes)
    res.redirect(`${FRONTEND_URL}/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    console.error('Error exchanging token:', err.response?.data || err.message);
    res.status(500).send('Token exchange failed');
  }
});

module.exports = router;
