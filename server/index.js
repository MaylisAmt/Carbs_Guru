import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import goalRoutes from './routes/goals.js';
import mealRoutes from './routes/meals.js';
import foodItemRoutes from './routes/foodItems.js';

// Configuration
dotenv.config({ path: '../.env' });
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(authRoutes);
app.use('/goals', goalRoutes);
app.use('/meals', mealRoutes);
app.use('/food-items', foodItemRoutes);

// Test route
app.get('/test', (req, res) => {
  res.status(200).json({message: 'Page de test backend'});
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();