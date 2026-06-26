import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || 'change-me';
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '12h';
