// src/hooks/useHotels.js

import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useHotels = (options = {}) => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const response = await api.listing.getAll(options);
        // Check if response has the expected structure
        if (response.data) {
          setHotels(response.data.listings);
          console.log(response.data)
        } else if (response.data) {
          // Handle case where data might be at the top level
          setHotels(response.data);
        } else {
          // Fallback for unexpected response structure
          console.warn('Unexpected API response structure:', response);
          setHotels([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err.response?.data?.message || 'Failed to fetch hotels');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [
    // Add dependencies based on the options you pass
    options.page, 
    options.limit, 
    options.sort,
    // Stringify any object params to avoid unnecessary re-renders
    JSON.stringify(options.filters)
  ]); 

  return { hotels, isLoading, error };
};