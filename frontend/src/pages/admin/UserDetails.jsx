import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance.js';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/users/${id}`)
      .then((response) => setUser(response.data.data))
      .catch(() => toast.error('Unable to load user details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Navbar title="User Details" />
          <div className="card"><p>User not found.</p></div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="User Details" />
        <div className="card" style={{ maxWidth: '720px' }}>
          <h2>{user.user.name}</h2>
          <p><strong>Email:</strong> {user.user.email}</p>
          <p><strong>Address:</strong> {user.user.address}</p>
          <p><strong>Role:</strong> <span className="badge">{user.user.role}</span></p>
          {user.storeRating && (
            <div>
              <h3>Store Ratings</h3>
              {user.storeRating.map((item) => (
                <div key={item.store.id} className="card store-card">
                  <p><strong>Store:</strong> {item.store.name}</p>
                  <p><strong>Average Rating:</strong> {item.averageRating}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
