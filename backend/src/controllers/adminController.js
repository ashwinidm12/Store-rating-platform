import { getAllUsers, findUserById } from '../services/userService.js';
import { createStore, listStores } from '../services/storeService.js';
import { registerUser } from '../services/authService.js';
import { User, Store, Rating } from '../models/index.js';

export const dashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    return res.json({ success: true, data: { totalUsers, totalStores, totalRatings } });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const { name, email, address, role, sortBy, sortOrder, page, limit } = req.query;
    const result = await getAllUsers({
      name,
      email,
      address,
      role,
      sortBy: sortBy || 'name',
      sortOrder: sortOrder || 'ASC',
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    return res.json({ success: true, data: { items: result.rows, total: result.count } });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await registerUser(req.body, { allowRole: true });
    return res.status(201).json({ success: true, message: 'User created', data: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const storeRating = user.role === 'STORE_OWNER'
      ? user.stores.map((store) => ({
          store: { id: store.id, name: store.name },
          averageRating: store.ratings.length ? Number((store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(2)) : 0
        }))
      : null;
    return res.json({ success: true, data: { user, storeRating } });
  } catch (error) {
    next(error);
  }
};

export const createStoreController = async (req, res, next) => {
  try {
    const store = await createStore(req.body);
    return res.status(201).json({ success: true, message: 'Store created', data: store });
  } catch (error) {
    next(error);
  }
};

export const getStores = async (req, res, next) => {
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
