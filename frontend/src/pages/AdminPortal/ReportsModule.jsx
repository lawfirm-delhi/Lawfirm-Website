import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../../api/axios';
import './ReportsModule.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReportsModule() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [consultations, setConsultations] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [consRes, clientsRes] = await Promise.all([
        api.get('/admin/consultations'),
        api.get('/admin/clients')
      ]);
      
      if (consRes.data.success) {
        setConsultations(consRes.data.data);
      }
      if (clientsRes.data.success) {
        setClients(clientsRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load reports data', err);
      setError('Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  };

  // --- KPI Calculations ---
  const totalConsultations = consultations.length;
  const totalClients = clients.length;
  
  const pendingCount = consultations.filter(c => c.status === 'Pending').length;
  const approvedCount = consultations.filter(c => c.status === 'Approved').length;
  const completedCount = consultations.filter(c => c.status === 'Completed').length;
  const rejectedCount = consultations.filter(c => c.status === 'Rejected').length;
  
  const activeClientsCount = clients.filter(c => !c.isLocked).length;

  // --- Chart Data Processing ---
  const practiceAreaMap = {};
  consultations.forEach(c => {
    const area = c.practice_area || 'Other';
    practiceAreaMap[area] = (practiceAreaMap[area] || 0) + 1;
  });
  
  const practiceAreaData = Object.keys(practiceAreaMap).map(key => ({
    name: key,
    value: practiceAreaMap[key]
  })).sort((a, b) => b.value - a.value);

  const statusData = [
    { name: 'Pending', value: pendingCount },
    { name: 'Approved', value: approvedCount },
    { name: 'Completed', value: completedCount },
    { name: 'Rejected', value: rejectedCount }
  ].filter(d => d.value > 0);

  // --- CSV Export Logic ---
  const convertToCSV = (arr) => {
    if (!arr || !arr.length) return '';
    const keys = Object.keys(arr[0]);
    const header = keys.join(',');
    const rows = arr.map(obj => keys.map(key => {
      let cell = obj[key] === null || obj[key] === undefined ? '' : String(obj[key]);
      cell = cell.replace(/"/g, '""');
      if (cell.search(/("|,|\n)/g) >= 0) {
        cell = `"${cell}"`;
      }
      return cell;
    }).join(','));
    return [header, ...rows].join('\n');
  };

  const downloadCSV = (data, filename) => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading analytics...</div>;
  }
  
  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div className="reports-module">
      <div className="reports-header">
        <h2>Business Intelligence Dashboard</h2>
        <div className="export-actions">
          <button onClick={() => downloadCSV(clients, 'clients_export.csv')} className="export-btn client-export">
            Export Clients CSV
          </button>
          <button onClick={() => downloadCSV(consultations, 'consultations_export.csv')} className="export-btn cons-export">
            Export Consultations CSV
          </button>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ background: '#f8fafc' }}>
          <h3 style={{ color: '#475569' }}>Total Consultations</h3>
          <p className="stat-number" style={{ color: '#0f172a' }}>{totalConsultations}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending Requests</h3>
          <p className="stat-number">{pendingCount}</p>
        </div>
        <div className="stat-card completed">
          <h3>Completed / Approved</h3>
          <p className="stat-number">{completedCount + approvedCount}</p>
        </div>
        <div className="stat-card" style={{ background: '#f8fafc' }}>
          <h3 style={{ color: '#475569' }}>Total Registered Clients</h3>
          <p className="stat-number" style={{ color: '#0f172a' }}>{totalClients}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3 className="chart-title">Consultations by Practice Area</h3>
          <div style={{ height: 350 }}>
            {practiceAreaData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={practiceAreaData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#0b1d45" radius={[4, 4, 0, 0]} name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">No data available</div>
            )}
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Consultation Status Distribution</h3>
          <div style={{ height: 350 }}>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
