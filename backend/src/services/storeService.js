import { Sequelize } from 'sequelize';
import { Store, Rating, User } from '../models/index.js';

export const createStore = async ({ name, email, address, owner_id }) => {
  const owner = await User.findByPk(owner_id);
  if (!owner || owner.role !== 'STORE_OWNER') {
    const error = new Error('Owner must be an existing store owner');
    error.status = 400;
    throw error;
  }
  return Store.create({ name, email, address, owner_id });
};

export const listStores = async ({ search, sortBy = 'name', sortOrder = 'ASC', page = 1, limit = 10 }) => {
  const where = {};
  if (search) {
    where[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.like]: `%${search}%` } },
      { address: { [Sequelize.Op.like]: `%${search}%` } }
    ];
  }
  const offset = (page - 1) * limit;
  const allowedSortFields = ['name', 'email', 'address'];
  const orderField = allowedSortFields.includes(sortBy) ? sortBy : 'name';

  return Store.findAndCountAll({
    where,
    include: [
      { model: Rating, as: 'ratings' },
      { model: User, as: 'owner', attributes: ['id', 'name', 'email'] }
    ],
    order: [[orderField, sortOrder]],
    limit,
    offset
  });
};

export const getStoreById = async (id) => {
  return Store.findByPk(id, {
    include: [
      { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
      { model: Rating, as: 'ratings', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] }
    ]
  });
};

export const getOwnerStoreSummary = async (ownerId) => {
  const stores = await Store.findAll({
    where: { owner_id: ownerId },
    include: [{ model: Rating, as: 'ratings', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] }]
  });

  const ratings = stores.flatMap((store) => store.ratings.map((rating) => ({ ...rating.toJSON(), storeName: store.name })));
  const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = ratings.length ? Number((totalRating / ratings.length).toFixed(2)) : 0;

  return { stores, averageRating, ratings };
};

export const getOwnerRatingsList = async (ownerId, { search, sortBy = 'created_at', sortOrder = 'DESC', page = 1, limit = 10 }) => {
  const stores = await Store.findAll({
    where: { owner_id: ownerId },
    attributes: ['id', 'name']
  });
  const storeIds = stores.map((store) => store.id);
  if (!storeIds.length) {
    return { rows: [], count: 0 };
  }

  const storeNameMap = Object.fromEntries(stores.map((store) => [store.id, store.name]));
  const where = { store_id: storeIds };

  if (search) {
    where[Sequelize.Op.or] = [
      { '$user.name$': { [Sequelize.Op.like]: `%${search}%` } },
      { '$user.email$': { [Sequelize.Op.like]: `%${search}%` } }
    ];
  }

  const allowedSortFields = ['rating', 'created_at'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
  const offset = (page - 1) * limit;

  const result = await Rating.findAndCountAll({
    where,
    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
    order: sortField === 'created_at' ? [[sortField, sortOrder]] : [[sortField, sortOrder]],
    limit,
    offset
  });

  const rows = result.rows.map((rating) => ({
    ...rating.toJSON(),
    storeName: storeNameMap[rating.store_id]
  }));

  return { rows, count: result.count };
};
