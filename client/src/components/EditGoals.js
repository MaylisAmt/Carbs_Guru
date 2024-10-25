import React, { useState, useEffect } from 'react';
import { editGoal, getGoals } from '../api.js';
import { useNavigate, useParams } from 'react-router-dom';
//import './AddGoals.css';  // Assuming you'll use the same styling

const EditGoals = () => {
  const navigate = useNavigate();
  const { goalId } = useParams(); // Assuming you're using React Router with a URL parameter

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

  // Fetch existing goal data when component mounts
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const goals = await getGoals();
        console.log('All goals:', goals);
        console.log('Current goalId:', goalId);
        const goalToEdit = goals.goals.find(goal => goal.goalId === goalId);
        console.log('Found goal:', goalToEdit);
        
        if (goalToEdit) {
          setFormData({
            mealName: goalToEdit.mealName,
            carbsTrain: goalToEdit.carbsTrain,
            carbsRest: goalToEdit.carbsRest,
            proteinsTrain: goalToEdit.proteinsTrain,
            proteinsRest: goalToEdit.proteinsRest,
            fatsTrain: goalToEdit.fatsTrain,
            fatsRest: goalToEdit.fatsRest
          });
        } else {
          setError('Goal not found');
        }
      } catch (err) {
        console.error("Error fetching goal: ", err);
        setError('Error loading goal data');
      }
    };

    fetchGoalData();
  }, [goalId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editGoal(goalId, formData);
      setSuccess('Goal updated successfully!');
      setError('');

      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while updating the goal');
      setSuccess('');
    }
  };

  return (
    <div className='content'>
      <div className='info'>
        <form className='prog_inputs' onSubmit={handleSubmit}>
          <div className='meal1'>
            {/* Display meal name instead of select */}
            <div className='repas1'>
              {formData.mealName.charAt(0).toUpperCase() + formData.mealName.slice(1)}
            </div>
            
            <input 
              type='float' 
              name='carbsTrain' 
              value={formData.carbsTrain} 
              onChange={handleChange} 
              className='carbs_input'
              placeholder={formData.carbsTrain}
            />
            <input 
              type='float' 
              name='proteinsTrain' 
              value={formData.proteinsTrain} 
              onChange={handleChange} 
              className='proteins_input'
              placeholder={formData.proteinsTrain}
            />
            <input 
              type='float' 
              name='fatsTrain' 
              value={formData.fatsTrain} 
              onChange={handleChange} 
              className='fat_input'
              placeholder={formData.fatsTrain}
            />
            <input 
              type='float' 
              name='carbsRest' 
              value={formData.carbsRest} 
              onChange={handleChange} 
              className='carbs_input'
              placeholder={formData.carbsRest}
            />
            <input 
              type='float' 
              name='proteinsRest' 
              value={formData.proteinsRest} 
              onChange={handleChange} 
              className='proteins_input'
              placeholder={formData.proteinsRest}
            />
            <input 
              type='float' 
              name='fatsRest' 
              value={formData.fatsRest} 
              onChange={handleChange} 
              className='fat_input'
              placeholder={formData.fatsRest}
            />
            <p>g</p>
          </div>
          <button className='save_button' type="submit">Update</button>
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
  );
};

export default EditGoals;


// import React, { useState, useEffect } from 'react';
// import { editGoal, getGoals } from '../api.js';
// import { useNavigate, useParams } from 'react-router-dom';
// import './AddGoals.css';

// const EditGoals = () => {
//   const navigate = useNavigate();
//   const { goalId } = useParams();

//   const [formData, setFormData] = useState({
//     mealName: '',
//     carbsTrain: '',
//     carbsRest: '',
//     proteinsTrain: '',
//     proteinsRest: '',
//     fatsTrain: '',
//     fatsRest: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchGoalData = async () => {
//       try {
//         const goals = await getGoals();
//         const goalToEdit = goals.find(goal => goal.goalId === parseInt(goalId));
        
//         if (goalToEdit) {
//           // Only extract the needed properties
//           const {
//             mealName,
//             carbsTrain,
//             carbsRest,
//             proteinsTrain,
//             proteinsRest,
//             fatsTrain,
//             fatsRest
//           } = goalToEdit;

//           setFormData({
//             mealName: mealName || '',
//             carbsTrain: carbsTrain || '',
//             carbsRest: carbsRest || '',
//             proteinsTrain: proteinsTrain || '',
//             proteinsRest: proteinsRest || '',
//             fatsTrain: fatsTrain || '',
//             fatsRest: fatsRest || ''
//           });
//         } else {
//           setError('Goal not found');
//         }
//       } catch (err) {
//         console.error('Error fetching goal:', err);
//         setError('Error loading goal data');
//       }
//     };

//     fetchGoalData();
//   }, [goalId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Create a new object with only the required data
//       const updatedGoalData = {
//         mealName: formData.mealName,
//         carbsTrain: parseFloat(formData.carbsTrain),
//         carbsRest: parseFloat(formData.carbsRest),
//         proteinsTrain: parseFloat(formData.proteinsTrain),
//         proteinsRest: parseFloat(formData.proteinsRest),
//         fatsTrain: parseFloat(formData.fatsTrain),
//         fatsRest: parseFloat(formData.fatsRest)
//       };

//       await editGoal(goalId, updatedGoalData);
//       setSuccess('Goal updated successfully!');
//       setError('');

//       setTimeout(() => {
//         navigate('/profile');
//       }, 2000);
//     } catch (err) {
//       console.error('Error updating goal:', err);
//       setError(err.message || 'An error occurred while updating the goal');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className='content'>
//       <div className='info'>
//         <form className='prog_inputs' onSubmit={handleSubmit}>
//           <div className='meal1'>
//             <div className='repas1'>
//               {formData.mealName.charAt(0).toUpperCase() + formData.mealName.slice(1)}
//             </div>
            
//             <input 
//               type='number'
//               step='0.1'
//               name='carbsTrain' 
//               value={formData.carbsTrain} 
//               onChange={handleChange} 
//               className='carbs_input'
//               placeholder={formData.carbsTrain.toString()}
//             />
//             <input 
//               type='number'
//               step='0.1'
//               name='proteinsTrain' 
//               value={formData.proteinsTrain} 
//               onChange={handleChange} 
//               className='proteins_input'
//               placeholder={formData.proteinsTrain.toString()}
//             />
//             <input 
//               type='number'
//               step='0.1'
//               name='fatsTrain' 
//               value={formData.fatsTrain} 
//               onChange={handleChange} 
//               className='fat_input'
//               placeholder={formData.fatsTrain.toString()}
//             />
//             <input 
//               type='number'
//               step='0.1'
//               name='carbsRest' 
//               value={formData.carbsRest} 
//               onChange={handleChange} 
//               className='carbs_input'
//               placeholder={formData.carbsRest.toString()}
//             />
//             <input 
//               type='number'
//               step='0.1'
//               name='proteinsRest' 
//               value={formData.proteinsRest} 
//               onChange={handleChange} 
//               className='proteins_input'
//               placeholder={formData.proteinsRest.toString()}
//             />
//             <input 
//               type='number'
//               step='0.1'
//               name='fatsRest' 
//               value={formData.fatsRest} 
//               onChange={handleChange} 
//               className='fat_input'
//               placeholder={formData.fatsRest.toString()}
//             />
//             <p>g</p>
//           </div>
//           <button className='save_button' type="submit">Update</button>
//         </form>
//       </div>
//       {error && (
//         <div className="error">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="success">
//           {success}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditGoals;