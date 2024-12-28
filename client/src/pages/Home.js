import React, { useState, useEffect } from 'react';
import { getProfile, getGoals, signout, getMealByGoalId } from '../api.js';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [profile, setProfile] = useState(null);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isTrainingMode, setIsTrainingMode] = useState(false)
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
              <div className='create-menu'>
                <button 
                className='create-menu-btn'
                onClick={() => handleCreateMenu(goal)}
                >
                  Create my menu
                </button>
              </div> 
            </li>
         
         ))}
          </ul>
          <h2 className='section-title'>Your daily total</h2>
        </div>
      

        
    </div>
  )
};

export default Home;
