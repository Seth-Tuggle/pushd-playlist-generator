import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');

  const [genres, setGenres] = useState('');
  const [excludedArtists, setExcludedArtists] = useState('');
  const [excludedSongs, setExcludedSongs] = useState('');


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access_token');
    const refresh = params.get('refresh_token');

    setAccessToken(access);
    setRefreshToken(refresh);

    if (access) {
      fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${access}` },
      })
        .then((res) => res.json())
        .then((data) => setUserProfile(data))
        .catch((err) => console.error('Failed to fetch user profile', err));
    }
  }, []);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setAiResult('Loading...');
    setPlaylistUrl('');

    try {
      const res = await fetch('http://localhost:3001/api/playlists/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      setAiResult(data.message || 'No AI response.');
      if (data.playlistUrl) {
        setPlaylistUrl(data.playlistUrl);
      }
    } catch (err) {
      setAiResult('Error calling AI.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Dashboard</h2>

      {userProfile ? (
        <>
          <h3>Welcome, {userProfile.display_name} 👋</h3>

          <form onSubmit={handlePromptSubmit} style={{ marginTop: '2rem' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your playlist vibe..."
              style={{ padding: '0.5rem', width: '60%' }}
            />
            <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
              Generate
            </button>
          </form>

          {aiResult && (
            <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
              <strong>AI Response:</strong>
              <p>{aiResult}</p>

              {playlistUrl && (
                <p>
                  🎧 <a href={playlistUrl} target="_blank" rel="noreferrer">Open Playlist on Spotify</a>
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
