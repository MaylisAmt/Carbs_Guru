import React, { useState, useEffect } from 'react';
import { getProfile, getGoals, signout, getMealByGoalId, getMealFoods } from '../api.js';
import './Home.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
    const [profile, setProfile] = useState(null);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTrainingMode, setIsTrainingMode] = useState(false)
    const [goalsWithMeals, setGoalsWithMeals] = useState({});
    const [savedFoods, setSavedFoods] = useState({});
    const navigate = useNavigate();
 
    useEffect(() => {
      const abortController = new AbortController();
  
      const fetchProfileAndGoals = async () => {
        try {
          setIsLoading(true);
          setError('');
          
          // First fetch profile
          const profileData = await getProfile(abortController.signal);
          setProfile(profileData);
           // Then fetch goals
          try {
            const goalsData = await getGoals(abortController.signal);
            setGoals(goalsData.goals || []);

            const mealsStatus = {};
            const foodsData = {};
            // Initialiser foodsData avec un tableau vide pour chaque goal
            for (const goal of goalsData.goals || []) {
              try {
                const existingMeal = await getMealByGoalId(goal.goalId);
                console.log('Réponse complète de getMealByGoalId:', existingMeal);
                mealsStatus[goal.goalId] = existingMeal ? true : false;
                console.log(`récupération du meal avec le goal ID :  ${goal.goalId} et le mealStatus : `, mealsStatus[goal.goalId]);
                if (existingMeal) {
                  // Fetch foods for this meal
                  const mealFoods = await getMealFoods(existingMeal.mealId);
                  foodsData[goal.goalId] = mealFoods.foods || [];
                  console.log('existing meal avec mealId : ', existingMeal.mealId)
                }
              } catch (err) {
                console.error(`Erreur détaillée pour le goal ${goal.goalId}:`, {
                  message: err.message,
                  status: err.response?.status,
                  data: err.response?.data
                });
                // console.error(`Erreur lors de la vérification du meal pour le goal ${goal.goalId}:`, err);
                mealsStatus[goal.goalId] = false;
              }
            }   
            setGoalsWithMeals(mealsStatus);
            setSavedFoods(foodsData)

          } catch (err) {
            // Ignore abort errors
            if (err.name === 'AbortError') {
              return;
            }

          // If the error message indicates no goals, treat it as an empty goals state
          if (err.message === 'No goals found for this user' || err.response?.status === 404) {
            setGoals([]);
          } else {
            console.error('Error fetching goals:', err);
            setError('Failed to fetch goals');
          }
        }
        } catch (err) {
          // Ignore abort errors
          if (err.name === 'AbortError') {
            return;
          }
          
          console.error('Error fetching profile:', err);
          setError('Failed to fetch profile');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfileAndGoals();
      return () => {
        abortController.abort();
      };
    }, []);

  const handleToggleChange = (e) => {
    setIsTrainingMode(e.target.checked);
  };
  
  const handleCreateMenu = async (goal) => {
    try{
      const existingMeal = await getMealByGoalId(goal.goalId);
      navigate('/create-menu', {
      state: {
        mealName: goal.mealName,
        existingMealId: existingMeal?.mealId,
        goals: {
          goalId: goal.goalId,
          carbsTrain: goal.carbsTrain,
          proteinsTrain: goal.proteinsTrain,
          fatsTrain: goal.fatsTrain,
          carbsRest: goal.carbsRest,
          proteinsRest: goal.proteinsRest,
          fatsRest: goal.fatsRest,
          isTrainingMode: isTrainingMode
        }
      }
    });
    } catch (error) {
      console.error('Erreur lors de la vérification du meal:', error);
    }
  };

  // Fonction pour calculer la quantité maximale consommable
  const calculateMaxPortion = (food, goal, isTraining) => {
    // Détermine l'objectif en fonction du mode d'entraînement
    const targetValues = {
      carbs: isTraining ? goal.carbsTrain : goal.carbsRest,
      proteins: isTraining ? goal.proteinsTrain : goal.proteinsRest,
      fats: isTraining ? goal.fatsTrain : goal.fatsRest
    };

    // Récupère la valeur cible pour le nutriment de l'aliment
    const targetValue = targetValues[food.nutrient.toLowerCase()];
    
    // Calcul de la portion maximale (règle de trois)
    // Si l'aliment contient 'nutrient_value' pour 100g
    // Alors pour atteindre 'targetValue', il faut :
    const maxPortion = (targetValue * 100) / food.nutrient_value;
    
    return Math.round(maxPortion); // Arrondi pour plus de lisibilité
  };

  return (
    <div>
        
            <h2>Welcome to the Home Page</h2>
        
        <div>
          <h2 className="section-title">Your goals</h2>
          <div className='toggle-trainMode'>
            <div>
              <div className='training-toggle-text'>
                <p>Will you be training today ?</p>
              </div>
              <input 
              type='checkbox' 
              id='train-mode-toggle' 
              className='toggle' 
              checked={isTrainingMode}
              onChange={handleToggleChange}/> 
              <label for='train-mode-toggle'></label> 
            </div>
          </div>
          <ul className="goals-list">
          {goals && goals.map((goal) => (
            <li key={goal.goalId} className="goal-card">
              <h3 className="goal-title">{goal.mealName}</h3>
              <div className="goal-metrics">
                {/* Labels Column */}
                <ul className="metrics-labels">
                  <li>Carbs</li>
                  <li>Proteins</li>
                  <li>Fats</li>
                </ul>
                
                { isTrainingMode ? (
                <div className="metrics-column">
                  <ul className="metrics-values">
                    <li>{goal.carbsTrain}g</li>
                    <li>{goal.proteinsTrain}g</li>
                    <li>{goal.fatsTrain}g</li>
                  </ul>
                </div>
                ) : (
                <div className="metrics-column">
                  <ul className="metrics-values">
                    <li>{goal.carbsRest}g</li>
                    <li>{goal.proteinsRest}g</li>
                    <li>{goal.fatsRest}g</li>
                  </ul>
                </div>
                )}
              </div>
               {/* Affichage des aliments sauvegardés */}
               {goalsWithMeals[goal.goalId] && savedFoods[goal.goalId] && (
                <div className="saved-foods">
                  <h4>Selected foods:</h4>
                  <ul className="saved-foods-list">
                    {savedFoods[goal.goalId].map((food) => {
                    const maxPortion = calculateMaxPortion(food, goal, isTrainingMode);
                    return (
                      <li key={food.foodId} className="saved-food-item">
                        <div className="food-info">
                          <span className="food-name">{food.foodName}</span>
                          <span className="food-max-portion">
                            max: {maxPortion}g
                          </span>
                          <span className="food-nutrient">
                            ({food.nutrient_value}g {food.nutrient}/100g)
                          </span>
                        </div>
                      </li>
                    );
                  })}
                  </ul>
                </div>
              )}
              <div className='create-menu'>
                <button 
                className='create-menu-btn'
                onClick={() => handleCreateMenu(goal)}
                >
                  {goalsWithMeals[goal.goalId] ? 'Modify my menu' : 'Create my menu'}
                </button>
              </div> 
            </li>
         
         ))}
          </ul>
        </div>
      

        
    </div>
  )
};

export default Home;
