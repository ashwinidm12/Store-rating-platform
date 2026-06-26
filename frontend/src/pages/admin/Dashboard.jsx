import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import api from '../../api/axiosInstance.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((response) => setStats(response.data.data))
      .catch(() => toast.error('Unable to load dashboard statistics'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Admin Dashboard" />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="stats-grid">
            <div className="card stat-card">
              <h3>Total Users</h3>
              <p className="stat-value">{stats?.totalUsers ?? 0}</p>
            </div>
            <div className="card stat-card">
              <h3>Total Stores</h3>
              <p className="stat-value">{stats?.totalStores ?? 0}</p>
            </div>
            <div className="card stat-card">
              <h3>Total Ratings</h3>
              <p className="stat-value">{stats?.totalRatings ?? 0}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
