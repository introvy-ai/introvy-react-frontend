// src/pages/CandidateAuth.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CandidateAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'reset'
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    let result;

    if (authMode === 'login') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else if (authMode === 'signup') {
      result = await supabase.auth.signUp({ email, password });
    } else if (authMode === 'reset') {
      result = await supabase.auth.resetPasswordForEmail(email);
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      if (authMode === 'reset') {
        setMessage('Password reset email sent! Check your inbox.');
      } else {
        setMessage(`Success! You’ve ${authMode === 'login' ? 'logged in' : 'signed up'}.`);
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>
        {authMode === 'login'
          ? 'Login'
          : authMode === 'signup'
          ? 'Sign Up'
          : 'Reset Password'}
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      {authMode !== 'reset' && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
      )}

      <button onClick={handleAuth} style={{ width: '100%', padding: '0.5rem' }}>
        {authMode === 'login'
          ? 'Login'
          : authMode === 'signup'
          ? 'Sign Up'
          : 'Send Reset Email'}
      </button>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}

      <div style={{ marginTop: '1rem' }}>
        {authMode === 'login' && (
          <>
            <button
              onClick={() => setAuthMode('signup')}
              style={{ marginRight: '1rem' }}
            >
              Switch to Sign Up
            </button>
            <button onClick={() => setAuthMode('reset')}>Forgot Password?</button>
          </>
        )}

        {authMode === 'signup' && (
          <button onClick={() => setAuthMode('login')}>Back to Login</button>
        )}

        {authMode === 'reset' && (
          <button onClick={() => setAuthMode('login')}>Back to Login</button>
        )}
      </div>
    </div>
  );
}
