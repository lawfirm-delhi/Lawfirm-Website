import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await api.get('/admin/consultations');
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

  const pendingCount = consultations.filter(c => c.status === 'Pending').length;
  const approvedCount = consultations.filter(c => c.status === 'Approved').length;
  const completedCount = consultations.filter(c => c.status === 'Completed').length;

  return (
    <div className="admin-dashboard-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Firm Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">Consultations</button>
          <button className="nav-item">Clients</button>
          <button className="nav-item">Reports</button>
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-outline" onClick={logout}>Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Portal</h1>
          <p className="subtitle">Manage consultations and firm operations.</p>
        </header>

        <div className="admin-content">
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
            <div className="table-header">
              <h2>All Consultations</h2>
            </div>
            {loading ? (
              <p style={{ padding: '2rem' }}>Loading records...</p>
            ) : consultations.length === 0 ? (
              <p style={{ padding: '2rem' }}>No consultations found.</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref Number</th>
                      <th>Date</th>
                      <th>Client Name</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultations.map(c => (
                      <tr key={c.id}>
                        <td><span className="ref-badge">{c.reference_number}</span></td>
                        <td>{new Date(c.created_at).toLocaleDateString()}</td>
                        <td>
                          <strong>{c.name}</strong><br />
                          <span className="text-muted">{c.email}</span>
                        </td>
                        <td>{c.subject}</td>
                        <td>
                          <span className={`status-badge status-${c.status.toLowerCase()}`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
