import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAllFoodItems } from '../controllers/foodController.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getAllFoodItems);

export default router;