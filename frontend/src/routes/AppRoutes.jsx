import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import AdminDashboard from '../pages/admin/Dashboard.jsx';
import AdminUsers from '../pages/admin/Users.jsx';
import AddUser from '../pages/admin/AddUser.jsx';
import AdminStores from '../pages/admin/Stores.jsx';
import AddStore from '../pages/admin/AddStore.jsx';
import UserDetails from '../pages/admin/UserDetails.jsx';
import UserDashboard from '../pages/user/Dashboard.jsx';
import UserStores from '../pages/user/Stores.jsx';
import UserChangePassword from '../pages/user/ChangePassword.jsx';
import OwnerDashboard from '../pages/owner/Dashboard.jsx';
import OwnerRatings from '../pages/owner/Ratings.jsx';
import OwnerChangePassword from '../pages/owner/ChangePassword.jsx';
import NotFound from '../pages/common/NotFound.jsx';
import Unauthorized from '../pages/common/Unauthorized.jsx';

const AppRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/users"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminUsers /></ProtectedRoute>}
      />
      <Route
        path="/admin/users/add"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><AddUser /></ProtectedRoute>}
      />
      <Route
        path="/admin/users/:id"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><UserDetails /></ProtectedRoute>}
      />
      <Route
        path="/admin/stores"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminStores /></ProtectedRoute>}
      />
      <Route
        path="/admin/stores/add"
        element={<ProtectedRoute allowedRoles={['ADMIN']}><AddStore /></ProtectedRoute>}
      />
      <Route
        path="/user/dashboard"
        element={<ProtectedRoute allowedRoles={['USER']}><UserDashboard /></ProtectedRoute>}
      />
      <Route
        path="/user/stores"
        element={<ProtectedRoute allowedRoles={['USER']}><UserStores /></ProtectedRoute>}
      />
      <Route
        path="/user/change-password"
        element={<ProtectedRoute allowedRoles={['USER']}><UserChangePassword /></ProtectedRoute>}
      />
      <Route
        path="/owner/dashboard"
        element={<ProtectedRoute allowedRoles={['STORE_OWNER']}><OwnerDashboard /></ProtectedRoute>}
      />
      <Route
        path="/owner/ratings"
        element={<ProtectedRoute allowedRoles={['STORE_OWNER']}><OwnerRatings /></ProtectedRoute>}
      />
      <Route
        path="/owner/change-password"
        element={<ProtectedRoute allowedRoles={['STORE_OWNER']}><OwnerChangePassword /></ProtectedRoute>}
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default AppRoutes;
