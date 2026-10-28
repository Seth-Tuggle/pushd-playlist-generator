const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 🎯 Get user preferences by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await pool.query('SELECT * FROM preferences WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

module.exports = router;
