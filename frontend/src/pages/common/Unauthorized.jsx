import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div style={{ maxWidth: '520px', margin: '80px auto', textAlign: 'center' }}>
    <div className="card">
      <h2>Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/login" className="button">Login</Link>
    </div>
  </div>
);

export default Unauthorized;
