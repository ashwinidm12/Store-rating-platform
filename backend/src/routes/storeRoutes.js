import { Router } from 'express';
import { getAllStores, getStoreDetails, getUserStoreRating } from '../controllers/storeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', getAllStores);
router.get('/:id', authenticate, getStoreDetails);
router.get('/:storeId/rating', authenticate, getUserStoreRating);
export default router;
