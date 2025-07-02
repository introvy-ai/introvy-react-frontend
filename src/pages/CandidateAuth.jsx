// src/pages/CandidateAuth.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CandidateAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    let result;
    if (authMode === 'login') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(`Success! You're ${authMode}ed.`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{authMode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleAuth}>
        {authMode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <p style={{ marginTop: '1rem' }}>{message}</p>
      <button
        style={{ marginTop: '1rem' }}
        onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
      >
        Switch to {authMode === 'login' ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
}
