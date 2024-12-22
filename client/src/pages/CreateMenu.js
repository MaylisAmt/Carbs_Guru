import React from 'react';
import { useLocation } from 'react-router-dom';
import './CreateMenu.css'

const CreateMenu = () => {
  const location = useLocation();
  const { mealName, goals } = location.state;

  return (
    <div>
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

      </div>
    </div>
  );
};

export default CreateMenu;