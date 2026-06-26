import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth.js';
import { validateEmail, validateName, validatePassword, validateAddress } from '../../utils/validators.js';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(form.name)) return toast.error('Name must be between 20 and 60 characters');
    if (!validateEmail(form.email)) return toast.error('Invalid email');
    if (!validatePassword(form.password)) return toast.error('Password must be 8-16 chars with uppercase and special symbol');
    if (!validateAddress(form.address)) return toast.error('Address must be at most 400 characters');

    try {
      await register(form);
      toast.success('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '520px', margin: '40px auto' }}>
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="field">
            <label>Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="button" type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
