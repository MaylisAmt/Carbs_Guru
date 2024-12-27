import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateMenu.css'
import BackArrow from '../components/BackArrow.js';
import FoodList from '../components/FoodList.js';
import { addFoodToMeal, removeFoodFromMeal, getMealFoods, createMeal } from '../api.js';

const CreateMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mealName, goals} = location.state || {};;
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [mealId, setMealId] = useState(null)

  // Charger les aliments déjà sélectionnés au chargement du composant
  useEffect(() => {
    console.log("Location state:", location.state); // Log des données passées via location.state
  }, [location]);

  useEffect(() => {
      const loadMealFoods = async () => {
      try {
        const mealFoods = await getMealFoods(mealId);
        setSelectedFoods(mealFoods);
        setIsLoading(false);
      } catch (err) {
        setError('Error loading meal foods. Please try again later.');
        setIsLoading(false);
      }
    };
    loadMealFoods();
  }, [mealId]);


  const handleSaveMenu = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const mealData = {
        mealName,
        goalId: goals.goalId, 
        //mealId,
        foods: selectedFoods.map(food => food.foodId),
        isTrainingMode: goals.isTrainingMode,
        goals: goals.isTrainingMode 
          ? {
              carbs: goals.carbsTrain,
              proteins: goals.proteinsTrain,
              fats: goals.fatsTrain
            }
          : {
              carbs: goals.carbsRest,
              proteins: goals.proteinsRest,
              fats: goals.fatsRest
            }
      };
      const result = await createMeal(mealData);
      // const { mealId } = result.meal;
      //setMealId(mealId)

      navigate('/home', { 
        state: { 
          message: 'Menu créé avec succès !',
        } 
      });
  
    } catch (err) {
      setError("Error saving today's menu. Please try again later.");
      
    } finally {
      setIsSaving(false);
    }
  };

  const handleFoodSelect = async (food) => {
    try {
      console.log("Adding food:", food); // Pour débugguer
  
      // Vérifiez si l'aliment est déjà sélectionné
      if (!selectedFoods.some(f => f.foodId === food.foodId)) {
        // Ajoutez l'aliment à la liste des aliments sélectionnés
        setSelectedFoods([...selectedFoods, food]);
      }
    } catch (err) {
      setError('Failed to add food to selection. Please try again.');
    }
  };

  // Fonction pour retirer un aliment de la sélection
  const handleRemoveFood = async (foodId) => {
    try {
       
       setSelectedFoods(selectedFoods.filter(food => food.foodId !== foodId));
    } catch (err){
      setError('Failed to remove food from meal. Please try again.');
    }
  };
  if (isLoading) {
    return <div>Loading meal data...</div>;
  }

  return (
    <div className='create-menu-page' >
      <BackArrow/>
      <h2>Today's menu for my {mealName}</h2>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
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
            <div className="save-menu-container">
              <button
              className={`save-menu-button ${isSaving || selectedFoods.length === 0 ? 'disabled' : ''}`}
              onClick={handleSaveMenu}
              disabled={isSaving || selectedFoods.length === 0}
              >
              {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder le menu'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;