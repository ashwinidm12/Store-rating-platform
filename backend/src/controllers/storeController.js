import { listStores, getStoreById } from '../services/storeService.js';
import { getUserRatingForStore } from '../services/ratingService.js';

export const getAllStores = async (req, res, next) => {
  try {
    const { search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
    const result = await listStores({
      search,
      sortBy: sortBy || 'name',
      sortOrder: sortOrder || 'ASC',
      page: Number(page),
      limit: Number(limit)
    });
    const items = result.rows.map((store) => {
      const averageRating = store.ratings.length
        ? store.ratings.reduce((sum, rating) => sum + rating.rating, 0) / store.ratings.length
        : 0;
      return { ...store.toJSON(), averageRating: Number(averageRating.toFixed(2)), ratingCount: store.ratings.length };
    });
    return res.json({ success: true, data: { items, total: result.count } });
  } catch (error) {
    next(error);
  }
};

export const getStoreDetails = async (req, res, next) => {
  try {
    const store = await getStoreById(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    const userRating = req.user ? await getUserRatingForStore(req.user.id, store.id) : null;
    const averageRating = store.ratings.length
      ? store.ratings.reduce((sum, rating) => sum + rating.rating, 0) / store.ratings.length
      : 0;
    return res.json({ success: true, data: { ...store.toJSON(), averageRating: Number(averageRating.toFixed(2)), userRating } });
  } catch (error) {
    next(error);
  }
};

export const getUserStoreRating = async (req, res, next) => {
  try {
    const rate = await getUserRatingForStore(req.user.id, Number(req.params.storeId));
    return res.json({ success: true, data: rate });
  } catch (error) {
    next(error);
  }
};
