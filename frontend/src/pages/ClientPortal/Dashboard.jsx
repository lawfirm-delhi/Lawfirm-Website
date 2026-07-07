import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await api.get('/consultations/me');
        setConsultations(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch consultations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Client Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('cases')}
          >
            My Cases
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-outline" onClick={logout}>Sign Out</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back, {user?.fullName || 'Client'}</h1>
          <p className="subtitle">Manage your legal matters securely.</p>
        </header>

        {activeTab === 'overview' && (
          <div className="dashboard-content">
            <div className="stat-grid">
              <div className="stat-card">
                <h3>Active Cases</h3>
                <p className="stat-number">{consultations.filter(c => c.status !== 'Completed').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Consultations</h3>
                <p className="stat-number">{consultations.length}</p>
              </div>
            </div>

            <div className="profile-card">
              <h3>Profile Information</h3>
              <div className="profile-details">
                <p><strong>Name:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.mobile}</p>
                {user?.company && <p><strong>Company:</strong> {user?.company}</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="dashboard-content">
            <div className="cases-header">
              <h2>My Consultations & Cases</h2>
            </div>
            
            {loading ? (
              <p>Loading cases...</p>
            ) : consultations.length === 0 ? (
              <div className="empty-state">
                <p>You have no active cases or consultations.</p>
                <a href="/consultation" className="btn btn-primary">Book a Consultation</a>
              </div>
            ) : (
              <div className="cases-list">
                {consultations.map(c => (
                  <div key={c.id} className="case-card">
                    <div className="case-header">
                      <span className="case-ref">{c.reference_number}</span>
                      <span className={`case-status status-${c.status.toLowerCase()}`}>{c.status}</span>
                    </div>
                    <h3 className="case-subject">{c.subject}</h3>
                    <p className="case-desc">{c.description.substring(0, 100)}...</p>
                    <div className="case-footer">
                      <span className="case-date">Requested: {new Date(c.created_at).toLocaleDateString()}</span>
                      <span className="case-type">{c.practice_area}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
