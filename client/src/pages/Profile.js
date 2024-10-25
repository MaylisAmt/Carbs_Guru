// import React, { useState, useEffect } from 'react';
// import { getProfile,getGoals } from '../api.js';
// import { useNavigate } from 'react-router-dom';
// import { signout } from '../api.js';
// //import Goals from './Goals.js';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [goals, setGoals] = useState([]);
//   const [error, setError] = useState('');
//   // const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {

//     // let isMounted = true;

//     const fetchProfileAndGoals = async () => {
//       try {
//         // setIsLoading(true);
//         //Fetch profile
//         const profileData = await getProfile();
//         // if (isMounted) {
//         setProfile(profileData);

//         //Fetch goals
//         const goalsData = await getGoals();
//         console.log('Goals Data: ', goalsData);
//         setGoals(goalsData.goals || []);
//         console.log('Goals State: ', goals);
//         // }
//       } catch (err) {
//         // if (isMounted) {
//           setError(err.message || 'Failed to fetch profile or goals');
//           console.error(err);
//         // }
//       }
//       // finally {
//       //   if (isMounted) {
//       //     setIsLoading(false);
//       //   }
//       // }
//     };

//     fetchProfileAndGoals();

//     // return () => {
//     //   isMounted = false;
//     // }
//   }
//   // , []
// );

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return (
//   //     <div>
//   //       <p>Error: {error}</p>
//   //       <button onClick={() => window.location.reload()}>Retry</button>
//   //     </div>
//   //   );
//   // }

//   const handleSignout = async () => {
//     try {
//       await signout();
//       navigate('/signin'); // Redirect to signin page after successful signout
//     } catch (err) {
//       setError('Failed to sign out');
//       console.error(err);
//     }
//   };

//   const handleAddGoal = () => {
//     navigate('/add-goal'); //Redirects to goal creation page
//   }

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Name: {profile.name}</p>
//       <p>Email: {profile.email}</p>


// {goals.length === 0 ? (
//   <div>
//     <p>No goals yet.</p>
//     <button onClick={handleAddGoal}>Add your first goal</button>
//   </div>
// ) : (
//   <div>
//     <h2>Your goals</h2>
//     <ul>
//       {goals.map(goal => (
//         <li key={goal.goalId}>
//           <h3>{goal.mealName}</h3>
//           <p>Training Day:</p>
//           <ul>
//             <li>Carbs: {goal.carbsTrain}g</li>
//             <li>Proteins: {goal.proteinsTrain}g</li>
//             <li>Fats: {goal.fatsTrain}g</li>
//           </ul>
//           <p>Rest Day:</p>
//           <ul>
//             <li>Carbs: {goal.carbsRest}g</li>
//             <li>Proteins: {goal.proteinsRest}g</li>
//             <li>Fats: {goal.fatsRest}g</li>
//           </ul>
//         </li>
//       ))}
//     </ul>
//     <button onClick={handleAddGoal}>Add another goal</button>
//   </div>
// )}

//       <button onClick={handleSignout}>Sign Out</button>
//     </div>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { getProfile, getGoals, signout } from '../api.js';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [goals, setGoals] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSigningOut, setIsSigningOut] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfileAndGoals = async () => {
//       try {
//         setIsLoading(true);
//         setError('');
        
//         // First fetch profile
//         const profileData = await getProfile();
//         if (!isMounted) return;
//         setProfile(profileData);

//         // Then fetch goals
//         try {
//           const goalsData = await getGoals();
//           if (!isMounted) return;
//           setGoals(goalsData.goals || []);
//         } catch (err) {
//           // If the error message indicates no goals, treat it as an empty goals state
//           if (err.message === 'No goals found for this user' || err.response?.status === 404) {
//             setGoals([]);
//           } else {
//             console.error('Error fetching goals:', err);
//             setError('Failed to fetch goals');
//           }
//         }
//       } catch (err) {
//         if (!isMounted) return;
//         console.error('Error fetching profile:', err);
//         setError('Failed to fetch profile');
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchProfileAndGoals();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleSignout = async () => {
//     if (isSigningOut) return;

//     try {
//       setIsSigningOut(true);
//       await signout();
//       navigate('/signin');
//     } catch (err) {
//       setError('Failed to sign out');
//       console.error('Signout error:', err);
//       setIsSigningOut(false);
//     }
//   };

//   const handleAddGoal = () => {
//     navigate('/add-goal');
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   // Only show error state for actual errors, not the "no goals" case
//   if (error && error !== 'No goals found for this user') {
//     return (
//       <div className="flex flex-col items-center gap-4 p-4">
//         <p className="text-red-600">Error: {error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
//       {profile && (
//         <div className="mb-6">
//           <p className="mb-2">Name: {profile.name}</p>
//           <p className="mb-4">Email: {profile.email}</p>
//         </div>
//       )}

//       <div className="mb-6">
//         {(!goals || goals.length === 0) ? (
//           <div className="text-center">
//             <p className="mb-4">No goals yet.</p>
//             <button
//               onClick={handleAddGoal}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Add your first goal
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Your goals</h2>
//             <ul className="space-y-6">
//               {goals.map(goal => (
//                 <li key={goal.goalId} className="border p-4 rounded">
//                   <h3 className="font-bold mb-2">{goal.mealName}</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="font-semibold">Training Day:</p>
//                       <ul className="ml-4">
//                         <li>Carbs: {goal.carbsTrain}g</li>
//                         <li>Proteins: {goal.proteinsTrain}g</li>
//                         <li>Fats: {goal.fatsTrain}g</li>
//                       </ul>
//                     </div>
//                     <div>
//                       <p className="font-semibold">Rest Day:</p>
//                       <ul className="ml-4">
//                         <li>Carbs: {goal.carbsRest}g</li>
//                         <li>Proteins: {goal.proteinsRest}g</li>
//                         <li>Fats: {goal.fatsRest}g</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleAddGoal}
//               className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Add another goal
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleSignout}
//         disabled={isSigningOut}
//         className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
//       >
//         {isSigningOut ? 'Signing out...' : 'Sign Out'}
//       </button>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { getProfile, getGoals, signout } from '../api.js';
import { useNavigate } from 'react-router-dom';

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

  const handleAddGoal = () => {
    navigate('/add-goal');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error && error !== 'No goals found for this user') {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      {profile && (
        <div className="mb-6">
          <p className="mb-2">Name: {profile.name}</p>
          <p className="mb-4">Email: {profile.email}</p>
        </div>
      )}

      <div className="mb-6">
        {(!goals || goals.length === 0) ? (
          <div className="text-center">
            <p className="mb-4">No goals yet.</p>
            <button
              onClick={handleAddGoal}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add your first goal
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your goals</h2>
            <ul className="space-y-6">
              {goals.map(goal => (
                <li key={goal.goalId} className="border p-4 rounded">
                  <h3 className="font-bold mb-2">{goal.mealName}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Training Day:</p>
                      <ul className="ml-4">
                        <li>Carbs: {goal.carbsTrain}g</li>
                        <li>Proteins: {goal.proteinsTrain}g</li>
                        <li>Fats: {goal.fatsTrain}g</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">Rest Day:</p>
                      <ul className="ml-4">
                        <li>Carbs: {goal.carbsRest}g</li>
                        <li>Proteins: {goal.proteinsRest}g</li>
                        <li>Fats: {goal.fatsRest}g</li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddGoal}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add another goal
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleSignout}
        disabled={isSigningOut}
        className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isSigningOut ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default Profile;