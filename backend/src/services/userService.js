import { Sequelize } from 'sequelize';
import { User } from '../models/index.js';

export const getAllUsers = async ({ name, email, address, role, sortBy = 'name', sortOrder = 'ASC', page = 1, limit = 10 }) => {
  const where = {};
  if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
  if (email) where.email = { [Sequelize.Op.like]: `%${email}%` };
  if (address) where.address = { [Sequelize.Op.like]: `%${address}%` };
  if (role) where.role = role;

  const offset = (page - 1) * limit;
  const allowedSortFields = ['name', 'email', 'address', 'role'];
  const orderField = allowedSortFields.includes(sortBy) ? sortBy : 'name';

  return User.findAndCountAll({
    where,
    order: [[orderField, sortOrder]],
    limit,
    offset
  });
};

export const findUserById = async (id) => {
  return User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'address', 'role', 'created_at', 'updated_at'],
    include: [{ association: 'stores', include: [{ association: 'ratings' }] }]
  });
};
