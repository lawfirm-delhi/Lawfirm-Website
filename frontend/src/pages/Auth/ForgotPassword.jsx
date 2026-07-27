import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return toast.error('Please enter your email address');
    }
    
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: formData.email });
      toast.success('OTP sent! Please check your email inbox.');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPassword) {
      return toast.error('Please enter the OTP and your new password');
    }

    if (formData.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await api.post('/auth/reset-password', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      toast.success('Password reset successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={step === 1 ? "Forgot Password" : "Reset Password"} 
      subtitle={step === 1 ? "Enter your email address to receive a secure One-Time Password." : "Enter the OTP sent to your email and your new password."}
    >
      {step === 1 ? (
        <form className="auth-form" onSubmit={handleSendOTP}>
          <div className="auth-field">
            <label className="auth-label">Email Address</label>
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
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleResetPassword}>
          <div className="auth-field">
            <label className="auth-label">6-Digit OTP</label>
            <input
              name="otp"
              type="text"
              required
              maxLength={6}
              className="auth-input"
              placeholder="123456"
              value={formData.otp}
              onChange={handleChange}
              style={{ letterSpacing: '2px', textAlign: 'center', fontSize: '1.2rem' }}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">New Password</label>
            <input
              name="newPassword"
              type="password"
              required
              className="auth-input"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      )}

      <div className="auth-footer" style={{ marginTop: '2rem' }}>
        <Link to="/login" className="auth-link">
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
