-- PostgreSQL-Compatible Schema for Push'd

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    spotify_id VARCHAR(255) NOT NULL UNIQUE,
    access_token VARCHAR(500),
    refresh_token VARCHAR(500),
    preferences TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    playlist_data TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional table for user preferences if needed
CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    genre TEXT,
    energy_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
