import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance.js';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';
import { useDebounce } from '../../hooks/useDebounce.js';

const PAGE_SIZE = 10;

const OwnerRatings = () => {
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/owner/ratings', {
        params: { search: debouncedSearch, page, limit: PAGE_SIZE, sortBy, sortOrder }
      });
      setRatings(response.data.data.items);
      setTotal(response.data.data.total);
    } catch {
      toast.error('Unable to load ratings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [page, sortBy, sortOrder, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const columns = [
    {
      key: 'userName',
      label: 'User Name',
      sortable: false,
      render: (rating) => rating.user?.name
    },
    {
      key: 'userEmail',
      label: 'User Email',
      sortable: false,
      render: (rating) => rating.user?.email
    },
    { key: 'rating', label: 'Rating', sortable: true },
    {
      key: 'created_at',
      label: 'Submission Date',
      sortable: true,
      render: (rating) => new Date(rating.created_at).toLocaleDateString()
    },
    { key: 'storeName', label: 'Store', sortable: false }
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Rating List" />
        <div className="card">
          <div className="filters">
            <SearchBar value={search} placeholder="Search by user name or email" onChange={setSearch} />
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DataTable columns={columns} data={ratings} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
              <Pagination page={page} total={total} limit={PAGE_SIZE} onPageChange={setPage} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default OwnerRatings;
