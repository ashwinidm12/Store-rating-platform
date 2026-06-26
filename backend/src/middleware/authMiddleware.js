import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';
import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token', errors: [error.message] });
  }
};
