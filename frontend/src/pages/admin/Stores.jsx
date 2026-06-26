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

const AdminStores = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/stores', {
        params: { search: debouncedSearch, page, limit: PAGE_SIZE, sortBy, sortOrder }
      });
      setStores(response.data.data.items);
      setTotal(response.data.data.total);
    } catch {
      toast.error('Unable to load stores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [page, sortBy, sortOrder, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'address', label: 'Address', sortable: true },
    {
      key: 'averageRating',
      label: 'Avg Rating',
      render: (store) => store.averageRating ?? 'N/A'
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (store) => store.owner?.name || 'N/A'
    }
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Store Management" />
        <div className="card">
          <div className="page-header">
            <h2 className="page-title">Stores</h2>
            <button className="button" onClick={() => navigate('/admin/stores/add')}>Add Store</button>
          </div>
          <div className="filters">
            <SearchBar value={search} placeholder="Search by name or address" onChange={setSearch} />
          </div>
          {loading ? <LoadingSpinner /> : (
            <>
              <DataTable columns={columns} data={stores} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
              <Pagination page={page} total={total} limit={PAGE_SIZE} onPageChange={setPage} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminStores;
