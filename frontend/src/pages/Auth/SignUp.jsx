import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This is just a frontend demo. Backend sign up logic is not implemented yet.');
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join us today to manage your consultations securely."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label className="auth-label">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            required
            className="auth-input"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

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
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="auth-input"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
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

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>

      <div className="auth-footer">
        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>
        <Link to="/login" className="auth-link">
          Log in instead
        </Link>
      </div>
    </AuthLayout>
  );
}
