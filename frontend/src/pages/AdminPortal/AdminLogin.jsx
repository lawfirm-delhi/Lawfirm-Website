import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Welcome@123#') {
      localStorage.setItem('admin_password', password);
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        border: '1px solid var(--border)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Admin Access</h2>
        <p style={{ color: 'var(--body)', marginBottom: '2rem' }}>Please enter the master password to continue.</p>
        
        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-primary)',
              color: 'var(--heading)',
              marginBottom: '1.5rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
