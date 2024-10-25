import React, { useState } from 'react'
import { setGoal } from '../api.js';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png'
import './Goals.css';


const Goals = () => {

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
      
      <h1>Profile</h1>
      <img src={icon} alt="profile_icon" />
      <p>Username</p>
      <p className='goals_title'>My goals</p>
      <p></p>
      <div className='info'>
        <div className='day_choice'>
          <div className='day_icon'></div>
          {/* <div className='toggle'>
            <input type="checkbox" id="switch" class="switch" />
            <label for="switch" class="slider"></label>
          </div> */}
        </div>
        <form className='prog_inputs' onSubmit={handleSubmit}>
          <div className='meal1'>
            {/* <input type='text' name='mealName' value={formData.mealName} onChange={handleChange} className='repas1'></input> */}
            <select name='mealName' value={formData.mealName} onChange={handleChange} className='repas1'>
              <option value=''>Select meal</option>
              <option value='breakfast'>Breakfast</option>
              <option value='lunch'>Lunch</option>
              <option value='snack'>Snack</option>
              <option value='dinner'>Dinner</option>
            </select>
            <input type='float' name='carbsTrain' value={formData.carbsTrain} onChange={handleChange} className='carbs_input'></input>
            <input type='float' name='proteinsTrain' value={formData.proteinsTrain} onChange={handleChange} className='proteins_input'></input>
            <input type='float' name='fatsTrain' value={formData.fatsTrain} onChange={handleChange} className='fat_input'></input>
            <input type='float' name='carbsRest' value={formData.carbsRest} onChange={handleChange} className='carbs_input'></input>
            <input type='float' name='proteinsRest' value={formData.proteinsRest} onChange={handleChange} className='proteins_input'></input>
            <input type='float' name='fatsRest' value={formData.fatsRest} onChange={handleChange} className='fat_input'></input>
            <p>g</p>
          </div>
          <hr/>
          <div className='meal2'>
            <p className='repas2'>db meal name</p>
            <input type='number' className='protein_input'></input>
            <input type='number' className='carbs_input'></input>
            <input type='number' className='fat_input'></input>
            <p>g</p>
          </div>
          <hr/>
          <div className='meal3'></div>
          <div className='meal4'></div>
          <div className='meal5'></div>
          <button className='save_button' type="submit">Save</button>
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


export default Goals