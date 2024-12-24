import React from 'react';
import { useLocation } from 'react-router-dom';
import './CreateMenu.css'
import BackArrow from '../components/BackArrow.js';

const CreateMenu = () => {
  const location = useLocation();
  const { mealName, goals } = location.state;

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
          </div>
          <div className='chosenItems'> 
            <p>Items I chose : </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenu;