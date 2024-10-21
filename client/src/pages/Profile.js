import React, { useState, useEffect } from 'react';
import { getProfile } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api.js';
import Goals from './Goals.js';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSignout = async () => {
    try {
      await signout();
      navigate('/signin'); // Redirect to signin page after successful signout
    } catch (err) {
      setError('Failed to sign out');
      console.error(err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Display other profile information */}
      <Goals />
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
};

export default Profile;