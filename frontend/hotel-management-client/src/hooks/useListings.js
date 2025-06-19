// src/hooks/useListings.js

import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../utils/api';

export const useListings = (initialFilters = {}) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const abortControllerRef = useRef(null);

  // Function to fetch listings with specified filters
  const fetchListings = useCallback(async (filterParams) => {
    // Cancel previous request if it's still in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    try {
      setLoading(true);
      setError(null);

      // Make the API call with the abort signal
      const response = await api.listings.getAll(filterParams, {
        signal: abortControllerRef.current.signal
      });
      
      if (response.data) {
        setListings(response.data.data || []);
        setTotalCount(response.data.total || 0);
      }
    } catch (err) {
      // Don't set errors for aborted requests
      if (err.name !== 'AbortError') {
        console.error('Error fetching listings:', err);
        setError(err.response?.data?.message || 'Failed to fetch listings');
        setListings([]);
        setTotalCount(0);
      }
    } finally {
      if (abortControllerRef.current?.signal?.aborted === false) {
        setLoading(false);
      }
    }
  }, []);

  // Apply new filters and fetch data
  const applyFilters = useCallback((newFilters) => {
    const mergedFilters = { ...filters, ...newFilters };
    setFilters(mergedFilters);
    fetchListings(mergedFilters);
  }, [filters, fetchListings]);

  // Initialize listings
  useEffect(() => {
    fetchListings(filters);
    
    // Cleanup function to abort any in-flight requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filters, fetchListings]);

  return {
    listings,
    loading,
    error,
    totalCount,
    filters,
    applyFilters,
    refresh: () => fetchListings(filters)
  };
};