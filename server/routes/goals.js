import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getMealByGoalId
} from '../controllers/goalController.js';

const router = express.Router();

// Toutes les routes des goals nécessitent une authentification
router.use(authenticateToken);

router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:goalId/meal', getMealByGoalId);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);

export default router;