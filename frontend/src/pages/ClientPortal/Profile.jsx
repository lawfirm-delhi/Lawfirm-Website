import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true
});

export default function Profile() {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      fullName: user.full_name || '',
      phone: user.mobile || '',
      company: user.company || ''
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // We can reuse the login method to update the user in context,
      // but the backend only returns the user object, not tokens.
      // So we just update the localStorage and context manually.
      const updatedUser = response.data.data;
      const fakeData = { tokens: { accessToken: token }, user: updatedUser };
      login(fakeData);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '10rem 1rem 4rem', background: 'var(--bg-gradient)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-primary)', padding: '3rem', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid var(--border)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '2rem' }}>Customize Profile</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Update your personal and professional details below.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--heading)', fontSize: '0.9rem', fontWeight: '500' }}>Email Address (Read-only)</label>
            <input 
              type="text" 
              disabled 
              value={user.email}
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--muted)', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--heading)', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
            <input 
              type="text" 
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--body)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--heading)', fontSize: '0.9rem', fontWeight: '500' }}>Phone Number</label>
            <input 
              type="text" 
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--body)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'var(--heading)', fontSize: '0.9rem', fontWeight: '500' }}>Company (Optional)</label>
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--body)' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ marginTop: '1rem', width: '100%', padding: '1rem', background: 'var(--primary-gold)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
