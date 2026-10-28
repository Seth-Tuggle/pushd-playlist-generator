import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redirect to your backend's Spotify auth route
    window.location.href = 'http://localhost:3001/api/auth/login';
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to Push’d</h2>
      <button onClick={handleLogin} style={styles.button}>
        🎧 Login with Spotify
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  button: {
    backgroundColor: '#1DB954',
    color: 'white',
    fontSize: '1.2rem',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};

export default Login;
