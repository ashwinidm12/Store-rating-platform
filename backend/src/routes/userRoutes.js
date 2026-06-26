import { Router } from 'express';
import { profile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authenticate);
router.get('/profile', profile);
export default router;
