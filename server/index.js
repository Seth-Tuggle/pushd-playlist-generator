require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const playlistRoutes = require('./routes/playlist');
const preferencesRoutes = require('./routes/preferences');
const testRoutes = require('./routes/test');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/test', testRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🎵 Push’d API is live!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
