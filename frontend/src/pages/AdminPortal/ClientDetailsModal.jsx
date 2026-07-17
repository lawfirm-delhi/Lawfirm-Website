import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import './ClientDetailsModal.css';

export default function ClientDetailsModal({ email, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/admin/clients/${email}/details`);
        if (response.data.success) {
          setData(response.data.data);
          setNotes(response.data.data.profile.admin_notes || '');
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

  const handleSaveNotes = async () => {
    try {
      setIsSavingNotes(true);
      const response = await api.patch(`/admin/clients/${email}/notes`, { notes });
      if (response.data.success) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

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

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <span className="profile-label">Internal Firm Notes (Private)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private notes about this client (e.g. preferences, past issues, special instructions)..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    marginTop: '0.5rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', alignItems: 'center', gap: '1rem' }}>
                  {notesSaved && <span style={{ color: '#10b981', fontSize: '0.9rem' }}>Notes saved successfully!</span>}
                  <button 
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    style={{
                      background: '#0b1d45',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: isSavingNotes ? 'not-allowed' : 'pointer',
                      opacity: isSavingNotes ? 0.7 : 1
                    }}
                  >
                    {isSavingNotes ? 'Saving...' : 'Save Notes'}
                  </button>
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
