import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="navbar">
      <div>
        <h1>{title}</h1>
        <div style={{ color: '#6b7280' }}>{user?.email}</div>
      </div>
      <button className="button secondary" onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </button>
    </div>
  );
};
