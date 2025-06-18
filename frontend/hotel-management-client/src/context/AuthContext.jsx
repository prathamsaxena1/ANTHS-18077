// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, logoutUser, getToken, getUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token/user on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    
    if (token && storedUser) {
      setUser(storedUser);
    }
    
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      setUser(data.user || data.data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const authContextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isHotelOwner: user && user.role === 'hotelOwner',
    isAdmin: user && user.role === 'admin',
    login: handleLogin,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);