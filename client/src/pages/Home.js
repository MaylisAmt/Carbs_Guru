// Home.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { getProfile, getGoals, signout } from '../api.js';

const Home = () => {

    const [profile, setProfile] = useState(null);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
 
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
  
  return (
    <div>
        <Header />
        
            <h2>Welcome to the Home Page</h2>
            <p>This is the home page of our application.</p>
        
        <div>
          <h2 className="section-title">Your goals</h2>
          <ul className="goals-list">
          {goals && goals.map((goal) => (
            <li key={goal.goalId} className="goal-card">
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
          
        </div>
      

        <Footer />
    </div>
  )
};

export default Home;
