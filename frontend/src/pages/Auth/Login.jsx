import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

// Ensure axios uses the correct base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true
});

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', formData);
      login(response.data.data);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Log in to access your dashboard and manage your account."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            className="auth-input"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="auth-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="auth-options">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              name="remember-me"
            />
            Remember me
          </label>
          <Link to="#" className="auth-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="auth-footer">
        <div className="auth-divider">
          <span>New to Justice & Associates?</span>
        </div>
        <Link to="/signup" className="auth-link">
          Create an account
        </Link>
      </div>
    </AuthLayout>
  );
}
