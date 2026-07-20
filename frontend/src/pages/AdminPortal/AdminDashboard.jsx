import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import './AdminDashboard.css';
import ClientDetailsModal from './ClientDetailsModal';

import ClientsModule from './ClientsModule';
import NewConsultationModal from './NewConsultationModal';
import ReportsModule from './ReportsModule';
import { useNavigate } from 'react-router-dom';
import { FileText, Receipt, Mail, Search, ChevronUp, ChevronDown, Users, BarChart } from 'lucide-react';

const DIRECTORY = [
  { name: 'Main Admin', role: 'Advocate', time: 'Active now', color: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)', avatar: 'M' },
  { name: 'Garima', role: 'Barrister', time: '2 hours ago', color: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', avatar: 'G' },
  { name: 'Tariq Adeeb', role: 'Barrister', time: '1 day ago', color: 'linear-gradient(135deg, #064E3B 0%, #022C22 100%)', avatar: 'T' },
  { name: 'Pankaj', role: 'Advocate', time: '5 hours ago', color: 'linear-gradient(135deg, #334155 0%, #1E293B 100%)', avatar: 'P' },
  { name: 'Kulwinder', role: 'Advocate', time: '1 day ago', color: 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)', avatar: 'K' },
  { name: 'Associate Advocate', role: 'Advocate', time: '3 days ago', color: 'linear-gradient(135deg, #4C1D95 0%, #2E1065 100%)', avatar: 'A' }
];

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Consultations');
  const [selectedClientEmail, setSelectedClientEmail] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const navigate = useNavigate();
  const adminProfile = localStorage.getItem('admin_profile');

  // Real-time presence state
  const [lastSeen, setLastSeen] = useState(() => {
    const stored = localStorage.getItem('admin_last_seen');
    if (stored) return JSON.parse(stored);
    
    // Seed initial data based on mock if not exists
    const now = Date.now();
    const initial = {
      'Main Admin': now,
      'Garima': now - 2 * 60 * 60 * 1000, // 2 hours ago
      'Tariq Adeeb': now - 24 * 60 * 60 * 1000, // 1 day ago
      'Pankaj': now - 5 * 60 * 60 * 1000, // 5 hours ago
      'Kulwinder': now - 24 * 60 * 60 * 1000, // 1 day ago
      'Associate Advocate': now - 3 * 24 * 60 * 60 * 1000 // 3 days ago
    };
    localStorage.setItem('admin_last_seen', JSON.stringify(initial));
    return initial;
  });

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (!adminProfile) {
      navigate('/admin/profiles');
      return;
    }
    fetchConsultations();

    // Update current user's last seen and sync state
    const updatePresence = () => {
      const now = Date.now();
      setCurrentTime(now);
      
      const stored = JSON.parse(localStorage.getItem('admin_last_seen') || '{}');
      stored[adminProfile] = now;
      localStorage.setItem('admin_last_seen', JSON.stringify(stored));
      setLastSeen(stored);
    };

    updatePresence();
    const interval = setInterval(updatePresence, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [adminProfile]);

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Offline';
    const diffInSeconds = Math.floor((currentTime - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Active now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const fetchConsultations = async () => {
    try {
      const response = await api.get(`/admin/consultations?assigned_to=${adminProfile}`);
      setConsultations(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch consultations', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admin/consultations/${id}/status`, { status: newStatus });
      // Update local state
      setConsultations(prev => 
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleAssignChange = async (id, newAssignee) => {
    try {
      await api.patch(`/admin/consultations/${id}/assign`, { assigned_to: newAssignee });
      setConsultations(prev => 
        prev.map(c => c.id === id ? { ...c, assigned_to: newAssignee } : c)
      );
    } catch (err) {
      console.error('Failed to assign consultation', err);
      alert('Failed to assign consultation. Please try again.');
    }
  };

  const handleDeleteConsultation = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        const response = await api.delete(`/admin/consultations/${id}`);
        if (response.data.success) {
          setConsultations(prev => prev.filter(c => c.id !== id));
        }
      } catch (err) {
        console.error('Failed to delete consultation', err);
        alert('Failed to delete consultation.');
      }
    }
  };

  const pendingCount = consultations.filter(c => c.status === 'Pending').length;
  const approvedCount = consultations.filter(c => c.status === 'Approved').length;
  const completedCount = consultations.filter(c => c.status === 'Completed').length;

  const filteredConsultations = consultations.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.name && c.name.toLowerCase().includes(searchLower)) ||
      (c.email && c.email.toLowerCase().includes(searchLower)) ||
      (c.reference_number && c.reference_number.toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Client Hub Overview</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'Consultations' ? 'active' : ''}`}
            onClick={() => setActiveTab('Consultations')}
          >
            <FileText size={18} className="nav-icon" /> Documents
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'Billings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Billings')}
          >
            <Receipt size={18} className="nav-icon" /> Billings
          </button>
          <button 
            className={`nav-item ${activeTab === 'Messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('Messages')}
          >
            <Mail size={18} className="nav-icon" /> Messages
          </button>
          
          {adminProfile === 'Main Admin' && (
            <>
              <button 
                className={`nav-item ${activeTab === 'Clients' ? 'active' : ''}`}
                onClick={() => setActiveTab('Clients')}
              >
                <Users size={18} className="nav-icon" /> Clients
              </button>
              <button 
                className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('Reports')}
              >
                <BarChart size={18} className="nav-icon" /> Reports
              </button>
            </>
          )}
        </nav>

        <div className="sidebar-search-container">
          <div className="sidebar-search">
            <Search size={16} />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="sidebar-directory">
          <div className="directory-header">
            <h3>Client Directory</h3>
            <ChevronUp size={16} />
          </div>
          <div className="directory-list">
            {DIRECTORY.map((member, idx) => {
              const displayTime = adminProfile === member.name ? 'Active now' : getTimeAgo(lastSeen[member.name]);
              return (
                <div key={idx} className="directory-item">
                  <div className="dir-avatar" style={{ background: member.color }}>
                    {member.avatar}
                  </div>
                  <div className="dir-info">
                    <div className="dir-name">{member.name}</div>
                    <div className="dir-role">{member.role}</div>
                  </div>
                  <div className="dir-time" style={{ color: displayTime === 'Active now' ? '#c5a880' : '' }}>
                    {displayTime}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="btn btn-outline" onClick={() => { localStorage.removeItem('admin_profile'); navigate('/admin/profiles'); }}>Switch Profile</button>
          <button className="btn btn-outline" style={{ marginTop: '0.5rem' }} onClick={() => { localStorage.removeItem('admin_token'); localStorage.removeItem('admin_profile'); navigate('/admin'); }}>Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome back, {adminProfile}</h1>
          <p className="subtitle">Manage consultations and firm operations.</p>
        </header>

        <div className="admin-content">
          {activeTab === 'Consultations' ? (
            <>
              <div className="stat-grid">
                <div className="stat-card pending">
                  <h3>Pending Cases</h3>
                  <p className="stat-number">{pendingCount}</p>
                </div>
                <div className="stat-card approved">
                  <h3>Approved Cases</h3>
                  <p className="stat-number">{approvedCount}</p>
                </div>
                <div className="stat-card completed">
                  <h3>Completed</h3>
                  <p className="stat-number">{completedCount}</p>
                </div>
              </div>

              <div className="table-container">
                <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2>All Consultations</h2>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => setIsNewModalOpen(true)}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: '500' }}
                    >
                      + New Consultation
                    </button>
                    <input 
                      type="text" 
                      placeholder="Search by name, email, or ref..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none', width: '250px' }}
                    />
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none' }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                {loading ? (
                  <p style={{ padding: '2rem' }}>Loading records...</p>
                ) : filteredConsultations.length === 0 ? (
                  <p style={{ padding: '2rem' }}>No consultations found matching your filters.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Ref Number</th>
                          <th>Date</th>
                          <th>Client Name</th>
                          <th>Subject</th>
                          <th>Assigned To</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConsultations.map(c => (
                          <tr key={c.id}>
                            <td><span className="ref-badge">{c.reference_number}</span></td>
                            <td>{new Date(c.created_at).toLocaleDateString()}</td>
                            <td>
                              <button 
                                onClick={() => setSelectedClientEmail(c.email)}
                                style={{ 
                                  background: 'transparent', 
                                  border: 'none', 
                                  padding: 0, 
                                  textAlign: 'left', 
                                  cursor: 'pointer',
                                  color: 'inherit'
                                }}
                              >
                                <strong>{c.name}</strong><br />
                                <span className="text-muted" style={{ textDecoration: 'underline' }}>{c.email}</span>
                              </button>
                            </td>
                            <td>{c.subject}</td>
                            <td>
                              {adminProfile === 'Main Admin' ? (
                                <select 
                                  className="status-select"
                                  value={c.assigned_to || 'Unassigned'}
                                  onChange={(e) => handleAssignChange(c.id, e.target.value)}
                                  style={{ border: '1px solid #cbd5e1', padding: '4px', borderRadius: '4px' }}
                                >
                                  <option value="Unassigned">Unassigned</option>
                                  <option value="Main Admin">Main Admin</option>
                                  <option value="Garima">Garima</option>
                                  <option value="Pankaj">Pankaj</option>
                                </select>
                              ) : (
                                <span className="status-badge" style={{ background: '#f1f5f9', color: '#475569' }}>
                                  {c.assigned_to || 'Unassigned'}
                                </span>
                              )}
                            </td>
                            <td>
                              <span className={`status-badge status-${c.status.toLowerCase()}`}>
                                {c.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <select 
                                  className="status-select"
                                  value={c.status}
                                  onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Approved">Approve</option>
                                  <option value="Completed">Complete</option>
                                  <option value="Rejected">Reject</option>
                                </select>
                                <button 
                                  onClick={() => handleDeleteConsultation(c.id)}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    padding: '0.4rem'
                                  }}
                                  title="Delete Consultation"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'Clients' ? (
            <ClientsModule onViewDetails={setSelectedClientEmail} />
          ) : activeTab === 'Reports' ? (
            <ReportsModule />
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>{activeTab} Module</h2>
              <p style={{ color: '#64748b' }}>This module is currently under active development. Check back soon for updates.</p>
            </div>
          )}
        </div>
      </main>

      {selectedClientEmail && (
        <ClientDetailsModal 
          email={selectedClientEmail} 
          onClose={() => setSelectedClientEmail(null)} 
        />
      )}

      {isNewModalOpen && (
        <NewConsultationModal 
          onClose={() => setIsNewModalOpen(false)}
          onCreated={() => {
            fetchConsultations();
            alert('Consultation created successfully!');
          }}
        />
      )}
    </div>
  );
}
