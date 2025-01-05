import express from 'express';
import { getAllFoodItems } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', getAllFoodItems);

export default router;