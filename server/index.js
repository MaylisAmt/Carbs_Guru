import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env'});
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// ES modules configuration

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Database configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'your_password',
  database: process.env.POSTGRES_DB || 'your_database',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false // Set to console.log to see SQL queries
});
// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
// Initialize database and start server
async function initializeApp() {
  await testConnection();
  // Sync all models
  // Note: In production, you might want to use {force: false}
  await sequelize.sync({ force: true });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
initializeApp();
// Export sequelize instance for use in model files
export default sequelize;

//Authenticate token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };

//Create User
const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };


//Create goal
const Goal = sequelize.define('Goal', {
    goalId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carbsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    carbsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    proteinsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    proteinsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fatsTrain: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fatsRest: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  
  // Define the relationship
  User.hasMany(Goal);
  Goal.belongsTo(User);

app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({message: 'Page de test backend'});
    } catch(err) {
        next(err);
    }
});

//Route signup
app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = await User.create({
        email,
        password,
        name
        });
        // Generate JWT token
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        );
        res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
    });

    app.post('/signin', async (req, res) => {
        try {
          const { email, password } = req.body;
          // Find user
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(400).json({ message: 'User not found' });
          }
          // Validate password
          const isValidPassword = await user.validatePassword(password);
          if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
          }
          // Generate JWT token
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
          res.json({
            message: 'Login successful',
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          });
        } catch (error) {
          res.status(500).json({ message: 'Error logging in', error: error.message });
        }
      });
      // Protected Profile Route
      app.get('/profile', authenticateToken, async (req, res) => {
        try {
          const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
          });
          if (!user) {
            return res.status(404).json({ message: 'Profile User not found' });
          }
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
      });

      //Change username
      app.put('/change-username', authenticateToken, async (req, res) => {
        try {
          const { newUsername } = req.body;
          const userId = req.user.id; // Assuming authenticateToken adds user info to req.user
      
          if (!newUsername) {
            return res.status(400).json({ message: 'New username is required' });
          }
      
          // Find the user and update their name
          const user = await User.findByPk(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          user.name = newUsername;
          await user.save();
      
          res.json({
            message: 'Username updated successfully',
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          });
        } catch (error) {
          res.status(500).json({ message: 'Error updating username', error: error.message });
        }
      });


    app.post('/goals', authenticateToken, async (req, res) => {
        try {
          const {
            mealName,
            carbsTrain,
            carbsRest,
            proteinsTrain,
            proteinsRest,
            fatsTrain,
            fatsRest
          } = req.body;
      
          // The user ID is now available in req.user, as set by authenticateToken
          const userId = req.user.id; // Assuming the JWT payload includes userId
      
          // Check if the user exists
          const user = await User.findByPk(userId);
          if (!user) {
            return res.status(404).json({ message: 'Goals User not found' });
          }
      
          // Create the goal
          const newGoal = await Goal.create({
            userId,
            mealName,
            carbsTrain,
            carbsRest,
            proteinsTrain,
            proteinsRest,
            fatsTrain,
            fatsRest
          });
      
          res.status(201).json({
            message: 'Goal created successfully',
            goal: newGoal
          });
        } catch (error) {
          console.error('Error creating goal:', error);
          res.status(500).json({ message: 'Error creating goal', error: error.message });
        }
      });

      //Retrive all goals corresponding to the authenticated user
      app.get('/goals', authenticateToken, async (req, res) => {
        try {
          const userId = req.user.id; // Get the user ID from the authenticated token
      
          // Find all goals for this user
          const goals = await Goal.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']] // Optional: Order by creation date, newest first
          });
      
          if (goals.length === 0) {
            return res.status(404).json({ message: 'No goals found for this user' });
          }
      
          res.json({
            message: 'Goals retrieved successfully',
            goals: goals
          });
        } catch (error) {
          console.error('Error retrieving goals:', error);
          res.status(500).json({ message: 'Error retrieving goals', error: error.message });
        }
      });

      app.put('/goals/:goalId', authenticateToken, async (req, res) => {
        try {
          const { goalId } = req.params;
          const userId = req.user.id;
          const {
            mealName,
            carbsTrain,
            carbsRest,
            proteinsTrain,
            proteinsRest,
            fatsTrain,
            fatsRest
          } = req.body;
      
          // Find the goal
          const goal = await Goal.findOne({ where: { goalId: goalId, userId } });
      
          if (!goal) {
            return res.status(404).json({ message: 'Goal not found or does not belong to the user' });
          }
      
          // Update the goal
          await goal.update({
            mealName,
            carbsTrain,
            carbsRest,
            proteinsTrain,
            proteinsRest,
            fatsTrain,
            fatsRest
          });
      
          res.json({
            message: 'Goal updated successfully',
            goal: goal
          });
        } catch (error) {
          console.error('Error updating goal:', error);
          res.status(500).json({ message: 'Error updating goal', error: error.message });
        }
      });