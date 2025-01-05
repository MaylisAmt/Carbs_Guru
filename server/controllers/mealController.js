import { Meal, FoodItem, MealFoodItem } from '../models/modelsIndex.js';
import sequelize from '../config/database.js';

export const createMeal = async (req, res) => {
  const { mealName, goalId, foods, isTrainingMode } = req.body;
  const transaction = await sequelize.transaction();
  
  try {
    // Create the meal
    const meal = await Meal.create({
      mealName,
      goalId,
      isTrainingMode
    }, { transaction });

    // Add food items
    for (const foodId of foods) {
      await MealFoodItem.create({
        mealId: meal.mealId,
        foodItemId: foodId,
      }, { transaction });
    }

    await transaction.commit();
    res.status(201).json({ message: 'Meal created successfully', meal });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

export const getMealFoods = async (req, res) => {
  try {
    const { mealId } = req.params;
    
    const meal = await Meal.findByPk(mealId, {
      include: [{
        model: FoodItem,
        through: MealFoodItem,
        attributes: ['foodId', 'foodName', 'nutrient', 'nutrient_value']
      }]
    });

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    const formattedFoods = meal.FoodItems.map(food => ({
      foodId: food.foodId,
      foodName: food.foodName,
      nutrient: food.nutrient,
      nutrient_value: food.nutrient_value
    }));

    res.json({ foods: formattedFoods });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meal foods' });
  }
};

export const addFoodToMeal = async (req, res) => {
  try {
    const { mealId } = req.params;
    const { foodId } = req.body;

    const existingAssociation = await MealFoodItem.findOne({
      where: {
        mealId,
        foodItemId: foodId
      }
    });

    if (!existingAssociation) {
      await MealFoodItem.create({
        mealId,
        foodItemId: foodId
      });
    }

    res.status(200).json({ message: 'Food item added to meal successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add food to meal' });
  }
};

export const removeFoodFromMeal = async (req, res) => {
  try {
    const { mealId, foodId } = req.params;

    await MealFoodItem.destroy({
      where: {
        mealId,
        foodItemId: foodId
      }
    });

    res.status(200).json({ message: 'Food item removed from meal successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove food from meal' });
  }
};

export const updateMealFoods = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { mealId } = req.params;
    const { foods } = req.body;

    // Delete old associations
    await MealFoodItem.destroy({
      where: { mealId },
      transaction
    });

    // Create new associations
    for (const foodId of foods) {
      await MealFoodItem.create({
        mealId,
        foodItemId: foodId,
      }, { transaction });
    }

    await transaction.commit();
    res.json({ message: 'Meal updated successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};
