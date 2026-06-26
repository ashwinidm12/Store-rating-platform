import { useState } from 'react';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { changePassword } from '../../api/authApi.js';
import { passwordPattern } from '../../utils/validators.js';

const ChangePassword = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordPattern.test(form.newPassword)) {
      return toast.error('New password must meet requirements');
    }
    try {
      await changePassword(form);
      toast.success('Password updated');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Change Password" />
        <div className="card" style={{ maxWidth: '520px' }}>
          <h2>Update Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="field"><label>Current Password</label><input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} required /></div>
            <div className="field"><label>New Password</label><input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required /></div>
            <button className="button" type="submit">Update</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
