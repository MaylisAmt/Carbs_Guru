import { Goal, Meal } from '../models/modelsIndex.js';

export const createGoal = async (req, res) => {
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

    const userId = req.user.id;

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
};

export const getGoals = async (req, res) => {
  try {
    const userId = req.user.id;

    const goals = await Goal.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    if (goals.length === 0) {
      return res.status(404).json({ message: 'No goals found for this user' });
    }

    res.json({
      message: 'Goals retrieved successfully',
      goals: goals
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving goals', error: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const goal = await Goal.findOne({ where: { goalId, userId } });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or does not belong to the user' });
    }

    await goal.update(updateData);

    res.json({
      message: 'Goal updated successfully',
      goal: goal
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const userId = req.user.id;

    const goal = await Goal.findOne({ where: { goalId, userId } });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or does not belong to the user' });
    }

    await goal.destroy();

    res.json({ message: 'Goal deleted successfully', goalId: goalId });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
};

export const getMealByGoalId = async (req, res) => {
  try {
    const { goalId } = req.params;
    console.log('Recherche du repas pour le goalId:', goalId);
    const meal = await Meal.findOne({
      where: { goalId }
    });
    console.log('Repas trouvé:', meal);
    if (!meal) {
      console.log('Aucun repas trouvé pour ce goalId');
      return res.status(404).json({ message: 'No meal found for this goal' });
    }
    
    res.json({ meal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
