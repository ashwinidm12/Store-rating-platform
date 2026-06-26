import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const registerUser = async ({ name, email, password, address, role = 'USER' }, { allowRole = false } = {}) => {
  const existing = await User.unscoped().findOne({ where: { email } });
  if (existing) {
    const error = new Error('Email already exists');
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const assignedRole = allowRole ? role : 'USER';
  return User.unscoped().create({ name, email, password: hashedPassword, address, role: assignedRole });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.unscoped().findOne({ where: { email } });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  return user;
};

export const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.unscoped().findByPk(userId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    const error = new Error('Current password is incorrect');
    error.status = 400;
    throw error;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};
