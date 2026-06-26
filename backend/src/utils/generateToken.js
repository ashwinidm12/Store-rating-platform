import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/jwtConfig.js';

export const generateToken = (payload) => jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
