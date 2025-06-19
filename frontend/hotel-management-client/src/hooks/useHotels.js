// hooks/useHotels.js

import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useHotels = (options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/hotels', { params: options });
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || { message: 'Failed to fetch hotels' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [options.page, options.limit, options.sort]); // Re-fetch when these params change

  return { data, isLoading, error };
};