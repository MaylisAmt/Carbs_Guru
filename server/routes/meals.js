import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createMeal,
  getMealFoods,
  addFoodToMeal,
  removeFoodFromMeal,
  updateMealFoods,
  getMealByGoal
} from '../controllers/mealController.js';

const router = express.Router();

// Routes principales des repas
router.post('/', createMeal);
router.get('/goals/:goalId/meal', getMealByGoal);

// Routes pour la gestion des aliments dans un repas
router.get('/:mealId/foods', getMealFoods);
router.post('/:mealId/foods', addFoodToMeal);
router.delete('/:mealId/foods/:foodId', removeFoodFromMeal);
router.put('/:mealId', updateMealFoods);

export default router;