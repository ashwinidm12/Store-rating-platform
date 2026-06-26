import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { api } from '../../api/axiosInstance.js';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    api.get('/stores', { params: { limit: 1 } }).then((response) => setCounts({ stores: response.data.data.total }));
  }, []);

  if (!counts) return <div>Loading...</div>;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="User Dashboard" />
        <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div className="card"><h3>Stores available</h3><p>{counts.stores}</p></div>
        </div>
        <div className="card" style={{ marginTop: '16px' }}>
          <h2>Quick Actions</h2>
          <button className="button" onClick={() => navigate('/user/stores')}>Browse Stores</button>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
