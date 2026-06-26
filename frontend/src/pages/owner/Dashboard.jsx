import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import api from '../../api/axiosInstance.js';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';

const OwnerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/owner/dashboard')
      .then((response) => setSummary(response.data.data))
      .catch(() => toast.error('Unable to load owner dashboard'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Owner Dashboard" />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="stats-grid">
              <div className="card stat-card">
                <h3>Average Store Rating</h3>
                <p className="stat-value">{summary?.averageRating || 'N/A'}</p>
              </div>
              <div className="card stat-card">
                <h3>Total Ratings Received</h3>
                <p className="stat-value">{summary?.ratings?.length ?? 0}</p>
              </div>
            </div>
            <div className="card" style={{ marginTop: '16px' }}>
              <h3>Your Stores</h3>
              {summary?.stores?.length ? summary.stores.map((store) => (
                <div key={store.id} className="card store-card">
                  <p><strong>{store.name}</strong></p>
                  <p>{store.address}</p>
                  <p>Ratings received: {store.ratings.length}</p>
                </div>
              )) : <p>No stores assigned yet.</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
