import { Rating, Store } from '../models/index.js';

export const submitRating = async ({ user_id, store_id, rating }) => {
  const store = await Store.findByPk(store_id);
  if (!store) {
    const error = new Error('Store not found');
    error.status = 404;
    throw error;
  }
  const existing = await Rating.findOne({ where: { user_id, store_id } });
  if (existing) {
    const error = new Error('User has already rated this store');
    error.status = 409;
    throw error;
  }
  return Rating.create({ user_id, store_id, rating });
};

export const updateRating = async (user_id, store_id, rating) => {
  const record = await Rating.findOne({ where: { user_id, store_id } });
  if (!record) {
    const error = new Error('Rating not found');
    error.status = 404;
    throw error;
  }
  record.rating = rating;
  await record.save();
  return record;
};

export const getUserRatingForStore = async (user_id, store_id) => {
  return Rating.findOne({ where: { user_id, store_id } });
};

export const getUserRatings = async (user_id) => {
  return Rating.findAll({
    where: { user_id },
    include: [{ model: Store, as: 'store', attributes: ['id', 'name', 'address'] }]
  });
};
