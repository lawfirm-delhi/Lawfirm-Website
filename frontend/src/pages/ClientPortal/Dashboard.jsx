import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCase, setSelectedCase] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const handleViewCase = async (consultation) => {
    setSelectedCase(consultation);
    fetchDocuments(consultation.id);
  };

  const fetchDocuments = async (consultationId) => {
    try {
      const response = await api.get(`/documents/case/${consultationId}`);
      setDocuments(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCase) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('consultationId', selectedCase.id);

    try {
      const response = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setDocuments(prev => [response.data.data, ...prev]);
    } catch (err) {
      console.error('Failed to upload document', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = null;
    }
  };

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
            onClick={() => { setActiveTab('cases'); setSelectedCase(null); }}
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
          <h1>Welcome back, {user?.full_name || user?.fullName || 'Client'}</h1>
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
                <p><strong>Name:</strong> {user?.full_name || user?.fullName}</p>
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
              <h2>{selectedCase ? `Case: ${selectedCase.reference_number}` : 'My Consultations & Cases'}</h2>
              {selectedCase && (
                <button className="btn btn-outline" onClick={() => setSelectedCase(null)}>Back to Cases</button>
              )}
            </div>
            
            {!selectedCase ? (
              loading ? (
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
                        <button className="btn btn-outline" onClick={() => handleViewCase(c)}>View & Upload</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="case-details-view">
                <div className="profile-card" style={{ marginBottom: '2rem' }}>
                  <h3>{selectedCase.subject}</h3>
                  <p>{selectedCase.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <span className={`case-status status-${selectedCase.status.toLowerCase()}`}>{selectedCase.status}</span>
                    <span className="case-date">Requested: {new Date(selectedCase.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="profile-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <h3 style={{ borderBottom: 'none', margin: 0, padding: 0 }}>Case Documents</h3>
                    <div>
                      <input 
                        type="file" 
                        id="document-upload" 
                        style={{ display: 'none' }} 
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      />
                      <label htmlFor="document-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
                        {uploading ? 'Uploading...' : 'Upload Document'}
                      </label>
                    </div>
                  </div>
                  
                  {documents.length === 0 ? (
                    <p style={{ color: '#666' }}>No documents uploaded yet.</p>
                  ) : (
                    <div className="documents-list">
                      {documents.map(doc => (
                        <div key={doc.id} className="document-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1rem' }}>
                          <div>
                            <strong>{doc.original_name}</strong>
                            <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#666' }}>
                              {(doc.size / 1024).toFixed(2)} KB • {new Date(doc.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <a 
                            href={`${import.meta.env.VITE_API_URL.replace('/api/v1', '')}/uploads/documents/${doc.filename}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
