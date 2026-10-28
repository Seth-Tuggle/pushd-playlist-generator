# Push'd AI Playlist Generator

A CS370 team project combining a React client, Express server, Spotify OAuth,
Ollama-generated song suggestions, track matching, and Spotify playlist creation.

## Contribution and team ownership

The team used AI to build the base code and collaborated on the implementation;
individual ownership of most components is not claimed. Seth Tuggle specifically
managed the Spotify developer API connection and also helped develop the rest
of the application. Team credit is retained in `CREDITS.md`.

## Local setup

1. Install PostgreSQL, Node, and Ollama. Prepare a local database using `db/schema.sql`.
2. Copy `server/.env.example` to `server/.env` and supply your own PostgreSQL and
   Spotify developer configuration. Set a local JWT secret if using that path.
3. Configure Spotify's callback to match the source's local callback URL:
   `http://localhost:3001/api/auth/callback`.
4. Run `npm ci` in both `server` and `client` (or `npm install` if rebuilding
   dependency resolution). Run `ollama pull llama3` and start Ollama.
5. Run `node index.js` from `server`, then `npm start` from `client`.

The selected server implementation calls the local `llama3` model despite some
historical filenames mentioning DeepSeek. Spotify access depends on your own
application settings and authorized users.

## Prototype limitations

Some user/profile/preferences routes are stubs. OAuth token handling includes
the original demo query-string redirect and should be redesigned before a public
deployment. A source upload is not a claim of production authentication security.
Dependencies and live Spotify/Ollama flows were not exercised during recovery.

See `RECOVERY_NOTES.md` for snapshot provenance.
