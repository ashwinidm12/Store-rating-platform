import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ maxWidth: '520px', margin: '80px auto', textAlign: 'center' }}>
    <div className="card">
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/login" className="button">Return to Login</Link>
    </div>
  </div>
);

export default NotFound;
