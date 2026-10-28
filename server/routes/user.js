const express = require('express');
const router = express.Router();

// Sample route to get user profile info
router.get('/:spotifyId', async (req, res) => {
  const { spotifyId } = req.params;
  // Retrieve user from DB logic (stub)
  res.json({
    spotifyId,
    preferences: {} // Return user preferences
  });
});

// Sample route to update user preferences
router.put('/:spotifyId', async (req, res) => {
  const { spotifyId } = req.params;
  const { preferences } = req.body;
  // Update user in DB logic (stub)
  res.json({
    message: 'User preferences updated',
    spotifyId,
    preferences
  });
});

module.exports = router;
