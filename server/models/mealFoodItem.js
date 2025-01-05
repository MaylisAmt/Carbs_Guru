import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import FoodItem from './foodItem.js';
import Meal from './meal.js';

const MealFoodItem = sequelize.define('MealFoodItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  mealId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Meal,
      key: 'mealId'
    }
  },
  foodItemId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: FoodItem,
      key: 'foodId'
    }
  }
}, {
  tableName: 'meal_food_items',
  timestamps: true  
});

export default MealFoodItem;