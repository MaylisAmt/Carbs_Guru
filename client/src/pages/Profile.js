import React, { useState, useEffect } from 'react';
import { getProfile, getGoals, signout, deleteGoal } from '../api.js';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import editpencil from '../assets/editpencil.png';
import bin from '../assets/bin.png';
import './Profile.css';
import Footer from '../components/Footer.js';
//import EditGoals from '../components/EditGoals.js';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

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

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  const handleSignout = async () => {
    if (isSigningOut) return;

    const abortController = new AbortController();

    try {
      setIsSigningOut(true);
      await signout(abortController.signal);
      navigate('/signin');
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
      setError('Failed to sign out');
      console.error('Signout error:', err);
      setIsSigningOut(false);
    }

    return () => {
      abortController.abort();
    };
  };

  const handleEdit = (goalId) => {
    // if (goalId) {
      console.log('Editing goal: ', goalId);
      navigate(`/goals/${goalId}`);
    // }
  };

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId);
        const response = await getGoals(); //Refresh the goals list
        setGoals(response.goals);
      }
      catch (error) {
        console.error('Error deleting goal: ', error);
      }
    }
  }

  const handleAddGoal = () => {
    navigate('/goals');
  };

//   

if (isLoading) {
  return (
    <div className="loading-container">
      <p>Loading...</p>
    </div>
  );
}

if (error && error !== 'No goals found for this user') {
  return (
    <div className="error-container">
      <p className="error-message">Error: {error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="button button-primary"
      >
        Retry
      </button>
    </div>
  );
}

return (
  <div className="content-wrapper">
    <h1 className="page-title">Profile</h1>
    
    {profile && (
      <div className="profile-section">
        <p className="profile-info">Name: {profile.name}</p>
        <p className="profile-info">Email: {profile.email}</p>
        <img src={icon} alt="profile_icon" />
      </div>
    )}

    <div className="goals-container">
      {(!goals || goals.length === 0) ? (
        <div className="goals-empty-state">
          <p className="profile-info">No goals yet.</p>
          <button
            onClick={handleAddGoal}
            className="button button-success"
          >
            Add your first goal
          </button>
        </div>
      ) : (
        <div>
          <h2 className="section-title">Your goals</h2>
          <ul className="goals-list">
          {goals && goals.map((goal) => (
            <li key={goal.goalId} className="goal-card">
              <div className="goal-actions">
                <button 
                  onClick={() => handleEdit(goal.goalId)}
                  className="button-edit-btn"
                >
                  <img src={editpencil} alt='edit-button' className='edit-button-img' />
                </button>
                <button 
                  onClick={() => handleDelete(goal.goalId)}
                  className="button-delete-btn"
                >
                  <img src={bin} alt='delete-button' className='delete-button-img' />
                </button>
              </div>
              <h3 className="goal-title">{goal.mealName}</h3>
              <div className="goal-metrics">
                {/* Labels Column */}
                <ul className="metrics-labels">
                  <li> </li>
                  <li>Carbs</li>
                  <li>Proteins</li>
                  <li>Fats</li>
                </ul>
                
                {/* Training Day Column */}
                <div className="metrics-column">
                  <p className="metrics-title">Train</p>
                  <ul className="metrics-values">
                    <li>{goal.carbsTrain}g</li>
                    <li>{goal.proteinsTrain}g</li>
                    <li>{goal.fatsTrain}g</li>
                  </ul>
                </div>

                {/* Rest Day Column */}
                <div className="metrics-column">
                  <p className="metrics-title">Rest</p>
                  <ul className="metrics-values">
                    <li>{goal.carbsRest}g</li>
                    <li>{goal.proteinsRest}g</li>
                    <li>{goal.fatsRest}g</li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
          </ul>
          <h2 className='section-title'>Your daily total</h2>
          <div className='daily-card'>
          
          </div>
          <button
            onClick={handleAddGoal}
            className="add-goal-btn"
          >
            Add another goal
          </button>
        </div>
      )}
    </div>

    <button
      onClick={handleSignout}
      disabled={isSigningOut}
      className={`${isSigningOut ? 'button-disabled' : 'button-signout'}`}
    >
      {isSigningOut ? 'Signing out...' : 'Sign Out'}
    </button>
    <Footer/>
  </div>
);
};

export default Profile;