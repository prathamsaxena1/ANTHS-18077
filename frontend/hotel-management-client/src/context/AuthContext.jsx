// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error loading user from storage:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save user and token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      // Save user and token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      // Call logout API endpoint to clear cookies
      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Clear state
      setCurrentUser(null);
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/updatedetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile update failed');
      }
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(data.data));
      
      // Update state
      setCurrentUser(data.data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if the user has a specific role
  const hasRole = (role) => {
    return currentUser && currentUser.role === role;
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isLoggedIn: !!currentUser,
    hasRole,
    isGuest: currentUser && currentUser.role === 'guest',
    isHotelOwner: currentUser && currentUser.role === 'hotelOwner',
    isAdmin: currentUser && currentUser.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};