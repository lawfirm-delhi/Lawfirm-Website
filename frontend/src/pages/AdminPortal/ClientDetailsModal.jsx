import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import './ClientDetailsModal.css';

export default function ClientDetailsModal({ email, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/clients/${email}/details`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to load client details.');
      } finally {
        setLoading(false);
      }
    };
    if (email) {
      fetchDetails();
    }
  }, [email]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {loading ? (
          <div className="modal-loading">Loading client history...</div>
        ) : error ? (
          <div className="modal-error">{error}</div>
        ) : data ? (
          <div className="modal-content">
            <h2 className="modal-title">Client Profile</h2>
            
            <div className="profile-section">
              <div className="profile-grid">
                <div>
                  <span className="profile-label">Full Name</span>
                  <p className="profile-value">{data.profile.fullName || data.profile.email.split('@')[0]}</p>
                </div>
                <div>
                  <span className="profile-label">Email Address</span>
                  <p className="profile-value">{data.profile.email}</p>
                </div>
                <div>
                  <span className="profile-label">Mobile</span>
                  <p className="profile-value">{data.profile.mobile || 'N/A'}</p>
                </div>
                <div>
                  <span className="profile-label">Company</span>
                  <p className="profile-value">{data.profile.company || 'N/A'}</p>
                </div>
                <div>
                  <span className="profile-label">Account Created</span>
                  <p className="profile-value">{new Date(data.profile.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="history-sections">
              <div className="history-column">
                <h3 className="section-title">Consultation History ({data.consultations.length})</h3>
                <div className="history-list">
                  {data.consultations.length === 0 ? (
                    <p className="empty-text">No consultations found.</p>
                  ) : (
                    data.consultations.map(c => (
                      <div key={c.id} className="history-card">
                        <div className="history-card-header">
                          <span className="ref-number">{c.reference_number}</span>
                          <span className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</span>
                        </div>
                        <p className="history-subject">{c.subject}</p>
                        <p className="history-date">{new Date(c.created_at).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="history-column">
                <h3 className="section-title">Login Activity ({data.loginHistory.length})</h3>
                <div className="history-list">
                  {data.loginHistory.length === 0 ? (
                    <p className="empty-text">No login history recorded.</p>
                  ) : (
                    data.loginHistory.map(log => (
                      <div key={log.id} className="history-card">
                        <div className="history-card-header">
                          <span className="history-subject">Session {log.success ? 'Started' : 'Failed'}</span>
                          <span className={`status-badge status-${log.success ? 'completed' : 'rejected'}`}>
                            {log.success ? 'Success' : 'Failed'}
                          </span>
                        </div>
                        <p className="history-date">{new Date(log.created_at).toLocaleString()}</p>
                        <p className="history-ip">IP: {log.ip_address || 'Unknown'}</p>
                        <p className="history-agent">{log.user_agent}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
