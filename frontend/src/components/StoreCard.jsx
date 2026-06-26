export const StoreCard = ({ store, userRating, onRate }) => (
  <div className="card store-card">
    <div className="store-card-header">
      <h3>{store.name}</h3>
      <span className="badge">{store.averageRating ? `${store.averageRating} / 5` : 'No ratings yet'}</span>
    </div>
    <p className="store-address">{store.address}</p>
    <div className="store-meta">
      <p><strong>Overall Rating:</strong> {store.averageRating ?? 'No ratings yet'}</p>
      <p><strong>Your Rating:</strong> {userRating ?? 'Not rated yet'}</p>
    </div>
    {onRate && (
      <button className="button" onClick={() => onRate(store)}>
        {userRating ? 'Modify Rating' : 'Submit Rating'}
      </button>
    )}
  </div>
);
