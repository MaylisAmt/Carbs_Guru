import React, { useState, useEffect } from 'react';
import { getProfile,getGoals } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api.js';
//import Goals from './Goals.js';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // let isMounted = true;

    const fetchProfileAndGoals = async () => {
      try {
        // setIsLoading(true);
        //Fetch profile
        const profileData = await getProfile();
        // if (isMounted) {
        setProfile(profileData);

        //Fetch goals
        const goalsData = await getGoals();
        console.log('Goals Data: ', goalsData);
        setGoals(goalsData.goals || []);
        console.log('Goals State: ', goals);
        // }
      } catch (err) {
        // if (isMounted) {
          setError(err.message || 'Failed to fetch profile or goals');
          console.error(err);
        // }
      }
      // finally {
      //   if (isMounted) {
      //     setIsLoading(false);
      //   }
      // }
    };

    fetchProfileAndGoals();

    // return () => {
    //   isMounted = false;
    // }
  }
  // , []
);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error}</p>
  //       <button onClick={() => window.location.reload()}>Retry</button>
  //     </div>
  //   );
  // }

  const handleSignout = async () => {
    try {
      await signout();
      navigate('/signin'); // Redirect to signin page after successful signout
    } catch (err) {
      setError('Failed to sign out');
      console.error(err);
    }
  };

  const handleAddGoal = () => {
    navigate('/add-goal'); //Redirects to goal creation page
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Display other profile information */}
      {/* <Goals /> */}

      {/* Displays goal or "no goals yet" message */}
      {/* {goals.length === 0 ? (
        <div>
          <p>No goals yet.</p>
          <button onClick={handleAddGoal}>Add you first goal</button>
        </div>
      ) : (
        <div>
          <h2>Your goals</h2>
          <ul>
            {goals.goalId}
          </ul>
        </div>
      )} */}


{goals.length === 0 ? (
  <div>
    <p>No goals yet.</p>
    <button onClick={handleAddGoal}>Add your first goal</button>
  </div>
) : (
  <div>
    <h2>Your goals</h2>
    <ul>
      {goals.map(goal => (
        <li key={goal.goalId}>
          <h3>{goal.mealName}</h3>
          <p>Training Day:</p>
          <ul>
            <li>Carbs: {goal.carbsTrain}g</li>
            <li>Proteins: {goal.proteinsTrain}g</li>
            <li>Fats: {goal.fatsTrain}g</li>
          </ul>
          <p>Rest Day:</p>
          <ul>
            <li>Carbs: {goal.carbsRest}g</li>
            <li>Proteins: {goal.proteinsRest}g</li>
            <li>Fats: {goal.fatsRest}g</li>
          </ul>
        </li>
      ))}
    </ul>
    <button onClick={handleAddGoal}>Add another goal</button>
  </div>
)}

      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Profile;