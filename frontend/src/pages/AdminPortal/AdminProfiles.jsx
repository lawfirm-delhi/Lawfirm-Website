import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './AdminProfiles.css';

const PROFILES = [
  { name: 'Main Admin', color: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)', avatar: 'M' },
  { name: 'Garima', color: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', avatar: 'G', img: '/team/garima.jpeg' },
  { name: 'Pankaj', color: 'linear-gradient(135deg, #334155 0%, #1E293B 100%)', avatar: 'P', img: '/team/pankaj.jpeg' },
  { name: 'Tariq Adeeb', color: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)', avatar: 'T', img: '/team/tariq.jpeg' },
  { name: 'Kulwinder', color: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', avatar: 'K', img: '/team/kulwinder.jpeg' },
  { name: 'Humaira', color: 'linear-gradient(135deg, #4C1D95 0%, #2E1065 100%)', avatar: 'H', img: '/team/humaira.jpeg' }
];

export default function AdminProfiles() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setPassword('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/verify-profile', {
        profileName: selectedProfile.name,
        password: password
      });

      if (response.data.success) {
        localStorage.setItem('admin_profile', selectedProfile.name);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  if (selectedProfile) {
    return (
      <div className="profiles-container">
        <div className="password-prompt">
          <button className="back-btn" onClick={() => setSelectedProfile(null)}>
            &larr; Back to Profiles
          </button>
          
          <div className="selected-avatar" style={{ background: selectedProfile.img ? 'transparent' : selectedProfile.color, backgroundImage: selectedProfile.img ? `url(${selectedProfile.img})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', border: selectedProfile.img ? '3px solid var(--primary-gold)' : 'none' }}>
            {!selectedProfile.img && selectedProfile.avatar}
          </div>
          <h2>Hi, {selectedProfile.name}</h2>
          <p>Please enter your PIN / Password</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              autoFocus
              required
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="profiles-container">
      <h1>Who's watching?</h1>
      <div className="profiles-grid">
        {PROFILES.map(p => (
          <div key={p.name} className="profile-card" onClick={() => handleProfileClick(p)}>
            <div className="profile-avatar" style={{ background: p.img ? 'transparent' : p.color, backgroundImage: p.img ? `url(${p.img})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', border: p.img ? '4px solid rgba(255, 255, 255, 0.1)' : 'none' }}>
              {!p.img && p.avatar}
            </div>
            <div className="profile-name">{p.name}</div>
          </div>
        ))}
      </div>
      <button 
        className="btn btn-ghost" 
        onClick={() => {
          localStorage.removeItem('admin_password');
          navigate('/admin');
        }} 
        style={{ marginTop: '3rem', color: '#64748b' }}
      >
        Sign out of Admin Portal
      </button>
    </div>
  );
}
