import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth.js';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form);
      toast.success('Logged in successfully');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser.role === 'ADMIN') navigate('/admin/dashboard');
      if (storedUser.role === 'USER') navigate('/user/dashboard');
      if (storedUser.role === 'STORE_OWNER') navigate('/owner/dashboard');
    } catch (error) {
      if (!error.response) {
        toast.error('Cannot reach server. Is the backend running on port 5000?');
        return;
      }
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto' }}>
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="button" type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
