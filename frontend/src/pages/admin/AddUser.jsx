import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import api from '../../api/axiosInstance.js';
import { passwordPattern, emailPattern } from '../../utils/validators.js';

const AddUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'USER' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || form.name.length < 20) return toast.error('Name must be at least 20 characters');
    if (!emailPattern.test(form.email)) return toast.error('Email is invalid');
    if (!passwordPattern.test(form.password)) return toast.error('Password must meet the required complexity');
    if (form.address.length > 400) return toast.error('Address can be up to 400 characters');
    try {
      await api.post('/admin/users', form);
      toast.success('User added successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add user');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Add User" />
        <div className="card" style={{ maxWidth: '700px' }}>
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            <div className="field"><label>Address</label><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div className="field"><label>Password</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
            <div className="field"><label>Role</label><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="ADMIN">ADMIN</option><option value="USER">USER</option><option value="STORE_OWNER">STORE_OWNER</option></select></div>
            <button className="button" type="submit">Create User</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUser;
