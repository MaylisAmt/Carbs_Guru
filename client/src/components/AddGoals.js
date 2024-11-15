import React, { useState } from 'react'
import { setGoal } from '../api.js';
import { useNavigate } from 'react-router-dom';
import './AddGoals.css';


const AddGoals = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mealName: '',
    carbsTrain: '',
    carbsRest: '',
    proteinsTrain: '',
    proteinsRest: '',
    fatsTrain: '',
    fatsRest: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setGoal(formData);
      console.log("formData: ", formData);
      setSuccess('Goal saved!');
      setError('');

      setTimeout(() => {
        navigate('/profile')
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occured during goal saving');
      setSuccess('');
    }
  };

    return (
    <div className='content'>
      <div className='info'>
        <form className='prog_inputs' onSubmit={handleSubmit}>
          <div className='meal1'>
            <select name='mealName' value={formData.mealName} onChange={handleChange} className='repas1'>
              <option value=''>Select meal</option>
              <option value='breakfast'>Breakfast</option>
              <option value='lunch'>Lunch</option>
              <option value='snack'>Snack</option>
              <option value='dinner'>Dinner</option>
            </select>
            <div className='inputs'>
              <div className='edit-train'>
                <p className='day-type'>Train</p>
                <div className='carbs-info'>
                  <p>Carbs</p>
                <input type='float' name='carbsTrain' value={formData.carbsTrain} onChange={handleChange} className='carbs_input'></input>
                </div>
                <div className='proteins-info'>
                  <p>Proteins</p>
                <input type='float' name='proteinsTrain' value={formData.proteinsTrain} onChange={handleChange} className='proteins_input'></input>
                </div>
                <div className='fats-info'>
                  <p>Fats</p>
                <input type='float' name='fatsTrain' value={formData.fatsTrain} onChange={handleChange} className='fat_input'></input>
                </div>
              </div>
              <div className='edit-rest'>
                <p className='day-type'>Rest</p>
                <div className='carbs-info'>
                  <p>Carbs</p>
                <input type='float' name='carbsRest' value={formData.carbsRest} onChange={handleChange} className='carbs_input'></input>
                </div>
                <div className='proteins-info'>
                  <p>Proteins</p>
                <input type='float' name='proteinsRest' value={formData.proteinsRest} onChange={handleChange} className='proteins_input'></input>
                </div>
                <div className='fats-info'>
                  <p>Fats</p>
                <input type='float' name='fatsRest' value={formData.fatsRest} onChange={handleChange} className='fat_input'></input>
                </div>
              </div>
            </div>
          </div>
          <button className='save_button' type="submit">Add goal</button>
        </form>
      </div>
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      {success && (
        <div className="success">
          {success}
        </div>
      )}
  </div>
  )
}


export default AddGoals