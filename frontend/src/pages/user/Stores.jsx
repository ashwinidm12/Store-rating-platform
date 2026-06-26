import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Sidebar } from '../../components/Sidebar.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { SearchBar } from '../../components/SearchBar.jsx';
import { StoreCard } from '../../components/StoreCard.jsx';
import { RatingModal } from '../../components/RatingModal.jsx';
import { Pagination } from '../../components/Pagination.jsx';
import { LoadingSpinner } from '../../components/LoadingSpinner.jsx';
import { useDebounce } from '../../hooks/useDebounce.js';
import { submitRating, updateRating } from '../../api/ratingApi.js';
import api from '../../api/axiosInstance.js';

const PAGE_SIZE = 10;

const UserStores = () => {
  const [search, setSearch] = useState('');
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search);

  const loadStores = async () => {
    setLoading(true);
    try {
      const [storesResponse, ratingsResponse] = await Promise.all([
        api.get('/stores', { params: { search: debouncedSearch, page, limit: PAGE_SIZE } }),
        api.get('/ratings/me')
      ]);

      const ratingsMap = Object.fromEntries(
        ratingsResponse.data.data.map((rating) => [rating.store_id, rating.rating])
      );

      setStores(storesResponse.data.data.items);
      setTotal(storesResponse.data.data.total);
      setUserRatings(ratingsMap);
    } catch {
      toast.error('Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, [page, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openRating = async (store) => {
    setSelectedStore(store);
    try {
      const response = await api.get(`/stores/${store.id}/rating`);
      setUserRating(response.data.data);
    } catch {
      setUserRating(null);
    }
  };

  const handleSubmitRating = async (payload) => {
    try {
      if (userRating) {
        await updateRating(selectedStore.id, payload);
        toast.success('Rating updated');
      } else {
        await submitRating(payload);
        toast.success('Rating submitted');
      }
      setSelectedStore(null);
      loadStores();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Rating failed');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <Navbar title="Stores" />
        <div className="card">
          <div className="filters">
            <SearchBar value={search} placeholder="Search by store name or address" onChange={setSearch} />
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : stores.length ? (
            <>
              {stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  userRating={userRatings[store.id]}
                  onRate={openRating}
                />
              ))}
              <Pagination page={page} total={total} limit={PAGE_SIZE} onPageChange={setPage} />
            </>
          ) : (
            <p>No stores found</p>
          )}
        </div>
        {selectedStore && (
          <RatingModal
            store={selectedStore}
            userRating={userRating}
            onClose={() => setSelectedStore(null)}
            onSubmit={handleSubmitRating}
          />
        )}
      </main>
    </div>
  );
};

export default UserStores;
