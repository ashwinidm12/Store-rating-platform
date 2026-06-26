import { Router } from 'express';
import { register, login, logout, changePassword } from '../controllers/authController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { registerSchema, loginSchema, passwordSchema } from '../utils/validators.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, validate(passwordSchema), changePassword);
export default router;
