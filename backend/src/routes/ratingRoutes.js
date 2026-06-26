import { Router } from 'express';
import { createRating, editRating, getMyRatings } from '../controllers/ratingController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { ratingSchema } from '../utils/validators.js';

const router = Router();
router.use(authenticate);
router.get('/me', getMyRatings);
router.post('/', validate(ratingSchema), createRating);
router.put('/:storeId', validate(ratingSchema), editRating);
export default router;
