import { submitRating, updateRating, getUserRatings } from '../services/ratingService.js';

export const createRating = async (req, res, next) => {
  try {
    const rating = await submitRating({ ...req.body, user_id: req.user.id });
    return res.status(201).json({ success: true, message: 'Rating submitted successfully', data: rating });
  } catch (error) {
    next(error);
  }
};

export const editRating = async (req, res, next) => {
  try {
    const rating = await updateRating(req.user.id, Number(req.params.storeId), req.body.rating);
    return res.json({ success: true, message: 'Rating updated successfully', data: rating });
  } catch (error) {
    next(error);
  }
};

export const getMyRatings = async (req, res, next) => {
  try {
    const ratings = await getUserRatings(req.user.id);
    return res.json({ success: true, data: ratings });
  } catch (error) {
    next(error);
  }
};
