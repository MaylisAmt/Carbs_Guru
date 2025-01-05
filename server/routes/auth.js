import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  signup,
  signin,
  signout,
  getProfile,
  updateUsername
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', authenticateToken, signout);
router.get('/profile', authenticateToken, getProfile);
router.put('/change-username', authenticateToken, updateUsername);

export default router;