import { Router } from 'express';
import { ownerDashboard, ownerRatings } from '../controllers/ownerController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();
router.use(authenticate, authorize(['STORE_OWNER']));
router.get('/dashboard', ownerDashboard);
router.get('/ratings', ownerRatings);
export default router;
