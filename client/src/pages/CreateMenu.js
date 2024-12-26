import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import './CreateMenu.css'
import BackArrow from '../components/BackArrow.js';
import FoodList from '../components/FoodList.js';

const CreateMenu = () => {
  const location = useLocation();
  const { mealName, goals } = location.state;
 
  const [selectedFoods, setSelectedFoods] = useState([]);

   // Fonction pour ajouter un aliment à la sélection :
   const handleFoodSelect = (food) => {
    // Ici on vérifie si l'aliment n'est pas déjà sélectionné pour éviter les doublons : 
    if (!selectedFoods.some(f => f.foodId === food.foodId)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };
  // Fonction pour retirer un aliment de la sélection
  const handleRemoveFood = (foodId) => {
    setSelectedFoods(selectedFoods.filter(food => food.foodId !== foodId));
  };

  return (
    <div className='create-menu-page' >
      <BackArrow/>
      <h2>Today's menu for my {mealName}</h2>
      <div className="meal-goals">
        <h3>Reminder of today's goals :</h3>
        {goals.isTrainingMode ? (
          <div>
            <p>Carbs: {goals.carbsTrain}g</p>
            <p>Proteins: {goals.proteinsTrain}g</p>
            <p>Fats: {goals.fatsTrain}g</p>
          </div>
        ) : (
          <div>
            <p>Carbs: {goals.carbsRest}g</p>
            <p>Proteins: {goals.proteinsRest}g</p>
            <p>Fats: {goals.fatsRest}g</p>
          </div>
        )}
      </div>
      <div className='pantry'>
        <h3>Pantry</h3>
        <div className='foodBoard'> 
          <div className='pantryItems'>
            <p>Items to choose from :</p>
            <FoodList onFoodSelect={handleFoodSelect} />
          </div>
          <div > 
            <p>Items I chose : </p>
            {selectedFoods.map(food => (
              <div key={food.foodId} className='chosen-item-card'>
                <div className="food-item-card"> 
                  <h3>{food.foodName}</h3> 
                  <div> 
                    ({food.nutrient_value}g {food.nutrient}) 
                  </div>
                </div>
                <div>
                  <button id= 'btn-food-item-card' onClick={() => handleRemoveFood(food.foodId)}>X</button>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;