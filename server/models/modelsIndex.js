import User from './user.js';
import Goal from './goal.js';
import Meal from './meal.js';
import FoodItem from './foodItem.js';
import MealFoodItem from './mealFoodItem.js';

// Define relationships
User.hasMany(Goal, {
  foreignKey: "userId",
});
Goal.belongsTo(User);

Goal.hasMany(Meal, {
  foreignKey: 'goalId',
  onDelete: 'CASCADE'  
});

Meal.belongsToMany(FoodItem, {
  through: MealFoodItem,
  foreignKey: 'mealId'
});

Meal.belongsTo(Goal, {
  foreignKey: 'goalId',
  onDelete: 'CASCADE'
});

FoodItem.belongsToMany(Meal, {
  through: MealFoodItem,
  foreignKey: 'foodItemId'
});

export {
  User,
  Goal,
  Meal,
  FoodItem,
  MealFoodItem
};