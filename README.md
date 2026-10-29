# Push'd AI Playlist Generator

I worked on Push'd for CS370. The app takes a playlist theme, asks a local Ollama
model for song suggestions, finds those songs on Spotify, and creates a playlist.
It brings together a React client, an Express server, Spotify OAuth, and a
PostgreSQL database.

## Running locally

1. Install PostgreSQL, Node, and Ollama. Set up a local database using `db/schema.sql`.
2. Copy `server/.env.example` to `server/.env` and fill in your PostgreSQL and
   Spotify developer settings. Set a local JWT secret if you use that code path.
3. Add `http://localhost:3001/api/auth/callback` as the callback URL in your
   Spotify application settings so it matches the server.
4. Run `npm ci` in both `server` and `client`. Use `npm install` instead if you
   need to rebuild dependency resolution. Run `ollama pull llama3` and start Ollama.
5. Run `node index.js` from `server`, then `npm start` from `client`.

The server uses the local `llama3` model, even though some filenames still mention
DeepSeek. You'll need your own Spotify application and authorized test users.

## What's unfinished

Some profile and preferences routes are still stubs. The OAuth demo passes tokens
through a query-string redirect; that flow needs to be changed before deploying
the app publicly. A working setup also depends on your Spotify and Ollama
configuration.

## Ownership

For details about my contributions and project attribution, see [CREDITS.md](CREDITS.md).
