import { FoodItem } from '../models/modelsIndex.js';

export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.setHeader('Content-Type', 'application/json');
    res.json(foodItems);
  } catch (error) {
    console.error('Erreur lors de la récupération des aliments:', error);
    res.status(500).json({ 
      message: "Erreur lors de la récupération des aliments" 
    });
  }
};