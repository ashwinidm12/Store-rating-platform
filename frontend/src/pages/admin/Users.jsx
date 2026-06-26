import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';
import { useDebounce } from '../../hooks/useDebounce.js';
import api from '../../api/axiosInstance.js';

const PAGE_SIZE = 10;

const AdminUsers = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [loading, setLoading] = useState(true);

  const debouncedFilters = useDebounce(filters);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users', {
        params: { ...debouncedFilters, page, limit: PAGE_SIZE, sortBy, sortOrder }
      });
      setUsers(response.data.data.items);
      setTotal(response.data.data.total);
    } catch {
      toast.error('Unable to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, sortBy, sortOrder, debouncedFilters]);

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters]);

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'action',
      label: 'Action',
      render: (user) => (
        <button className="button secondary" onClick={() => navigate(`/admin/users/${user.id}`)}>
          View
        </button>
      )
    }
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="User Management" />
        <div className="card">
          <div className="page-header">
            <h2 className="page-title">Users</h2>
            <button className="button" onClick={() => navigate('/admin/users/add')}>Add User</button>
          </div>
          <div className="filters">
            <SearchBar value={filters.name} placeholder="Filter by name" onChange={(value) => setFilters({ ...filters, name: value })} />
            <SearchBar value={filters.email} placeholder="Filter by email" onChange={(value) => setFilters({ ...filters, email: value })} />
            <SearchBar value={filters.address} placeholder="Filter by address" onChange={(value) => setFilters({ ...filters, address: value })} />
            <select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
              <option value="">All roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
              <option value="STORE_OWNER">STORE_OWNER</option>
            </select>
          </div>
          {loading ? <LoadingSpinner /> : (
            <>
              <DataTable columns={columns} data={users} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
              <Pagination page={page} total={total} limit={PAGE_SIZE} onPageChange={setPage} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
