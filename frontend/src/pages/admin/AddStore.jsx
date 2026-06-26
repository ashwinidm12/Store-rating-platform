import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import api from '../../api/axiosInstance.js';
import { emailPattern } from '../../utils/validators.js';

const AddStore = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '', owner_id: '' });

  useEffect(() => {
    api.get('/admin/users', { params: { role: 'STORE_OWNER', limit: 100 } }).then((response) => {
      setOwners(response.data.data.items);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name) return toast.error('Store name is required');
    if (!emailPattern.test(form.email)) return toast.error('Valid store email is required');
    if (!form.address) return toast.error('Store address is required');
    if (!form.owner_id) return toast.error('Select an owner');
    try {
      await api.post('/admin/stores', form);
      toast.success('Store created');
      navigate('/admin/stores');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Add Store" />
        <div className="card" style={{ maxWidth: '700px' }}>
          <h2>Add Store</h2>
          <form onSubmit={handleSubmit}>
            <div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div className="field"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
            <div className="field"><label>Address</label><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required /></div>
            <div className="field"><label>Owner</label><select value={form.owner_id} onChange={(e) => setForm({ ...form, owner_id: e.target.value })} required><option value="">Select owner</option>{owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>)}</select></div>
            <button className="button" type="submit">Create Store</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddStore;
