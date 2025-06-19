// src/hooks/useUserProfile.js

import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useUserProfile = (email) => {
  const [userListings, setUserListings] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First, check if we have an email or need to get current user
        let userEmail = email;
        
        // If no email is provided, fetch the current user's profile first
        if (!userEmail) {
          const profileResponse = await api.user.getProfile();
          if (profileResponse.data && profileResponse.data.data) {
            setUserProfile(profileResponse.data.data);
            userEmail = profileResponse.data.data.email;
          } else {
            throw new Error('Could not retrieve user profile');
          }
        }
        
        // Now fetch the user's listings using the email
        if (userEmail) {
          const listingsResponse = await api.user.getUserListings(userEmail);
          if (listingsResponse.data && listingsResponse.data.data) {
            setUserListings(listingsResponse.data.data);
          } else {
            setUserListings([]);
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  return { userProfile, userListings, isLoading, error };
};