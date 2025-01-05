import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} from '../controllers/goalController.js';

const router = express.Router();

// Toutes les routes des goals nécessitent une authentification
router.use(authenticateToken);

router.post('/', createGoal);
router.get('/', getGoals);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);

export default router;