# Push'd AI Playlist Generator

I worked on Push'd for CS370. The project combines a React client, Express server,
Spotify OAuth, PostgreSQL, and a local Ollama model. Its goal was to turn a written
playlist theme into song suggestions, find those songs on Spotify, and create a
playlist.

## Historical coursework

I'm keeping this repository as a description of the class project and an archive
of its main code. I'm not maintaining it as a standalone service. It depended on
the development configuration, Spotify application access, database, and local
model setup used for class. Those services, dependencies, and API requirements
may now be outdated or deprecated.

## Main code

- `client/`: the React interface and playlist screens.
- `server/`: Express routes, Spotify authorization, and playlist creation.
- `server/ai/`: the local Ollama integration.
- `db/schema.sql`: the database schema used by the project.

The selected server code uses `llama3`, despite some older filenames mentioning
DeepSeek. Environment examples are included for reference, without credentials.
This version retains unfinished profile routes, a playlist request-path mismatch,
and demonstration authentication/token handling. It isn't a verified local setup
or a live service, and I'm preserving those limitations rather than updating the
application.

## Ownership

For details about my contributions and project attribution, see [CREDITS.md](CREDITS.md).
