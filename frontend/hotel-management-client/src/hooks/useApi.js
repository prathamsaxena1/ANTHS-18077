// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';

// Generic hook for API calls
export function useApi(apiFunction, immediate = false, initialParams = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);
  
  // Execute the API call
  const execute = useCallback(async (params = initialParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.friendlyMessage || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, initialParams]);
  
  // Run the API call on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute(initialParams);
    }
  }, [execute, immediate, initialParams]);
  
  return { data, error, loading, execute, setData };
}

// Custom hooks for specific resources
export function useHotels(params, immediate = true) {
  const { data, error, loading, execute } = useApi(
    (params) => import('../utils/api').then(module => module.hotelAPI.getAll(params)),
    immediate,
    params
  );
  
  return {
    hotels: data?.data || [],
    totalCount: data?.count || 0,
    error,
    loading,
    fetchHotels: execute
  };
}

export function useHotel(id, immediate = true) {
  const { data, error, loading, execute } = useApi(
    () => import('../utils/api').then(module => module.hotelAPI.get(id)),
    immediate && !!id
  );
  
  return {
    hotel: data?.data || null,
    error,
    loading,
    fetchHotel: execute
  };
}

export function useBookings(params, immediate = true) {
  const { data, error, loading, execute } = useApi(
    (params) => import('../utils/api').then(module => module.bookingAPI.getAll(params)),
    immediate,
    params
  );
  
  return {
    bookings: data?.data || [],
    totalCount: data?.count || 0,
    error,
    loading,
    fetchBookings: execute
  };
}
