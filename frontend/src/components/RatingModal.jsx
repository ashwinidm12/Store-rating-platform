import { useState, useEffect } from 'react';
import { ConfirmDialog } from './ConfirmDialog.jsx';

export const RatingModal = ({ store, userRating, onClose, onSubmit }) => {
  const [rating, setRating] = useState(userRating?.rating || 1);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setRating(userRating?.rating || 1);
  }, [userRating]);

  const handleConfirm = () => {
    setShowConfirm(false);
    onSubmit({ store_id: store.id, rating });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="card modal-card">
          <h2>{userRating ? 'Modify Rating' : 'Submit Rating'}</h2>
          <p className="modal-subtitle">{store.name}</p>
          <p>{store.address}</p>
          <div className="field">
            <label>Rating (1-5)</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="dialog-actions">
            <button className="button secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="button" type="button" onClick={() => setShowConfirm(true)}>
              {userRating ? 'Update Rating' : 'Submit Rating'}
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={showConfirm}
        title={userRating ? 'Update rating?' : 'Submit rating?'}
        message={`Are you sure you want to ${userRating ? 'update' : 'submit'} a rating of ${rating} for ${store.name}?`}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
        confirmLabel={userRating ? 'Update' : 'Submit'}
      />
    </>
  );
};
