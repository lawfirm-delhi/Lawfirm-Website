import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function ClientsModule({ onViewDetails }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/clients');
      if (response.data.success) {
        setClients(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLock = async (id, currentStatus) => {
    try {
      const response = await api.patch(`/admin/clients/${id}/lock`, { isLocked: !currentStatus });
      if (response.data.success) {
        setClients(prev => prev.map(c => c.userId === id ? { ...c, isLocked: !currentStatus } : c));
      }
    } catch (err) {
      console.error('Failed to toggle lock:', err);
    }
  };

  const filteredClients = clients.filter(c => {
    const isLocked = Boolean(c.isLocked);
    const matchesStatus = statusFilter === 'All' 
      ? true 
      : (statusFilter === 'Active' ? !isLocked : isLocked);
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.fullName && c.fullName.toLowerCase().includes(searchLower)) ||
      (c.email && c.email.toLowerCase().includes(searchLower)) ||
      (c.mobile && c.mobile.toLowerCase().includes(searchLower));
      
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card pending">
          <h3>Total Clients</h3>
          <p className="stat-number">{clients.length}</p>
        </div>
        <div className="stat-card approved">
          <h3>Active Accounts</h3>
          <p className="stat-number">{clients.filter(c => !c.isLocked).length}</p>
        </div>
        <div className="stat-card completed">
          <h3>Locked Accounts</h3>
          <p className="stat-number">{clients.filter(c => c.isLocked).length}</p>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Master Client Directory</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Search by name, email, or mobile..." 
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
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p style={{ padding: '2rem' }}>Loading client directory...</p>
        ) : filteredClients.length === 0 ? (
          <p style={{ padding: '2rem' }}>No clients found matching your filters.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Profile</th>
                  <th>Contact</th>
                  <th>Date Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(c => (
                  <tr key={c.userId}>
                    <td>
                      <strong>{c.fullName || c.email.split('@')[0]}</strong><br />
                      <span className="text-muted">{c.company || 'Individual Client'}</span>
                    </td>
                    <td>
                      <span className="text-muted">{c.email}</span><br />
                      <span className="text-muted">{c.mobile || 'N/A'}</span>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${c.isLocked ? 'rejected' : 'completed'}`}>
                        {c.isLocked ? 'Locked' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => onViewDetails(c.email)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '4px',
                            background: 'white',
                            color: '#334155',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleToggleLock(c.userId, c.isLocked)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            border: `1px solid ${c.isLocked ? '#10b981' : '#ef4444'}`,
                            borderRadius: '4px',
                            background: 'white',
                            color: c.isLocked ? '#10b981' : '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {c.isLocked ? 'Unlock' : 'Lock'}
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
  );
}
