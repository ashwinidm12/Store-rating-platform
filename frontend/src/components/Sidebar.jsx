import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const items = {
    ADMIN: [
      { to: '/admin/dashboard', label: 'Dashboard' },
      { to: '/admin/users', label: 'Users' },
      { to: '/admin/stores', label: 'Stores' }
    ],
    USER: [
      { to: '/user/dashboard', label: 'Dashboard' },
      { to: '/user/stores', label: 'Stores' },
      { to: '/user/change-password', label: 'Change Password' }
    ],
    STORE_OWNER: [
      { to: '/owner/dashboard', label: 'Dashboard' },
      { to: '/owner/ratings', label: 'Ratings' },
      { to: '/owner/change-password', label: 'Change Password' }
    ]
  };

  return (
    <aside className="sidebar">
      <h2>Store Rating</h2>
      <nav>
        {items[user.role]?.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
