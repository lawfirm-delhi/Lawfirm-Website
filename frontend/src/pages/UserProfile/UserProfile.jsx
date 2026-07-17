import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Briefcase, Lock, Loader2, ShieldCheck, CheckCircle } from 'lucide-react';

import './UserProfile.css';

export default function UserProfile() {
  const { user, updateProfile, changePassword } = useAuth();
  
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || user?.full_name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    company: user?.company || ''
  });
  const [profileStatus, setProfileStatus] = useState({ loading: false, error: null, success: false });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordStatus, setPasswordStatus] = useState({ loading: false, error: null, success: false });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileStatus({ loading: true, error: null, success: false });
    try {
      await updateProfile(profileData);
      setProfileStatus({ loading: false, error: null, success: true });
      setTimeout(() => setProfileStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (err) {
      setProfileStatus({ loading: false, error: err.response?.data?.message || 'Failed to update profile', success: false });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordStatus({ loading: false, error: 'New passwords do not match', success: false });
      return;
    }
    setPasswordStatus({ loading: true, error: null, success: false });
    try {
      await changePassword({ 
        currentPassword: passwordData.currentPassword, 
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setPasswordStatus({ loading: false, error: null, success: true });
      setTimeout(() => setPasswordStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (err) {
      setPasswordStatus({ loading: false, error: err.response?.data?.message || 'Failed to change password', success: false });
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="container">
          <h1 className="hero-title">Client Dashboard</h1>
          <p className="hero-subtitle">Manage your personal information and security settings securely.</p>
        </div>
      </div>

      <div className="container profile-container">
        <div className="profile-grid">
          
          <div className="profile-card">
            <div className="card-header">
              <User className="card-icon" />
              <h2>Personal Information</h2>
            </div>
            <form onSubmit={handleProfileSubmit} className="profile-form">
              {profileStatus.error && <div className="alert error">{profileStatus.error}</div>}
              {profileStatus.success && <div className="alert success"><CheckCircle size={18} /> Profile updated successfully</div>}
              
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input type="text" value={profileData.fullName} onChange={e => setProfileData({...profileData, fullName: e.target.value})} required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} required />
                </div>
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-with-icon">
                  <Phone size={18} />
                  <input type="tel" value={profileData.mobile} onChange={e => setProfileData({...profileData, mobile: e.target.value})} required />
                </div>
              </div>

              <div className="form-group">
                <label>Company (Optional)</label>
                <div className="input-with-icon">
                  <Briefcase size={18} />
                  <input type="text" value={profileData.company} onChange={e => setProfileData({...profileData, company: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={profileStatus.loading}>
                {profileStatus.loading ? <Loader2 className="spin" size={18} /> : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <ShieldCheck className="card-icon" />
              <h2>Security Settings</h2>
            </div>
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              {passwordStatus.error && <div className="alert error">{passwordStatus.error}</div>}
              {passwordStatus.success && <div className="alert success"><CheckCircle size={18} /> Password changed successfully</div>}
              
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} required />
                </div>
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} required />
                </div>
                <small className="form-help">Must be at least 12 characters with an uppercase, lowercase, number, and special character.</small>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input type="password" value={passwordData.confirmNewPassword} onChange={e => setPasswordData({...passwordData, confirmNewPassword: e.target.value})} required />
                </div>
              </div>

              <button type="submit" className="btn btn-outline" disabled={passwordStatus.loading}>
                {passwordStatus.loading ? <Loader2 className="spin" size={18} /> : 'Update Password'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
