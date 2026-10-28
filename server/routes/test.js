const express = require('express');
const testRouter = express.Router();
const pool = require('../config/db');

// 🧪 Simple route to test DB connection
testRouter.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

module.exports = testRouter;
