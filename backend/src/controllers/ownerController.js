import { getOwnerStoreSummary, getOwnerRatingsList } from '../services/storeService.js';

export const ownerDashboard = async (req, res, next) => {
  try {
    const summary = await getOwnerStoreSummary(req.user.id);
    return res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};

export const ownerRatings = async (req, res, next) => {
  try {
    const { search, sortBy, sortOrder, page, limit } = req.query;
    const result = await getOwnerRatingsList(req.user.id, {
      search,
      sortBy: sortBy || 'created_at',
      sortOrder: sortOrder || 'DESC',
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    return res.json({ success: true, data: { items: result.rows, total: result.count } });
  } catch (error) {
    next(error);
  }
};
