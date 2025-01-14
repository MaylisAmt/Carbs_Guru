import React, { useState, useEffect } from 'react';
import { getFoodList } from '../services/api.js';
import './FoodList.css'

const FoodList = ({ onFoodSelect }) => {
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Utilisation du middleware getFoodList
    const loadFoods = async () => {
      try {
        const foodData = await getFoodList();
        setFoods(foodData);
        setIsLoading(false);
      } catch (err) {
        setError('Error while loading foodlist. Please try again later.');
        setIsLoading(false);
      }
    };
  // Charger les aliments au montage du composant
  useEffect(() => {
    loadFoods();
  }, []);
  
  const handleFoodClick = (food) => {
    onFoodSelect(food);
  };
 
  if (isLoading) {
    return <div >Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div >
      <div className='content-food-list'>
        <div >
          {foods.length === 0 ? (
            <p >Aucun aliment enregistré</p>
          ) : (
            foods.map((food) => (
              <div className='food-item-card'
              key={food.foodId}
              onClick={() => handleFoodClick(food)}>
                <h3 >{food.foodName}</h3>
                <p>
                  {food.nutrient } : {food.nutrient_value}g
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodList;