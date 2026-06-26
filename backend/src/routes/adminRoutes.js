import { Router } from 'express';
import { dashboard, listUsers, createUser, getUserDetails, createStoreController, getStores } from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { userCreateSchema, storeCreateSchema } from '../utils/validators.js';

const router = Router();
router.use(authenticate, authorize(['ADMIN']));
router.get('/dashboard', dashboard);
router.get('/users', listUsers);
router.post('/users', validate(userCreateSchema), createUser);
router.get('/users/:id', getUserDetails);
router.get('/stores', getStores);
router.post('/stores', validate(storeCreateSchema), createStoreController);
export default router;
