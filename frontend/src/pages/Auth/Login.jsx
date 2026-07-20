import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This is just a frontend demo. Backend login logic is not implemented yet.');
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

        <button type="submit" className="auth-button">
          Log In
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
