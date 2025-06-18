// context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

// Create the auth context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on initial load
  useEffect(() => {
    const checkUserSession = () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Session restoration error:', error);
        // Clear potentially corrupted session data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkUserSession();
  }, []);

  // Login function
  const login = async (email, password, rememberMe) => {
    try {
      // Make API request to login endpoint
      const response = await fetch('http://localhost:8001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { 
          response: { 
            data: { message: data.message || 'Login failed' } 
          } 
        };
      }
      
      // Save user data and token
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(data.user));
      storage.setItem('token', data.token);
      
      // Update state
      setCurrentUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      
      // Clear state
      setCurrentUser(null);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // Make API request to register endpoint
      const response = await fetch('http://localhost:8001/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { 
          response: { 
            data: { message: data.message || 'Registration failed' } 
          } 
        };
      }
      
      // Save user data and token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Update state
      setCurrentUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return currentUser && currentUser.role === role;
  };

  // Value to be provided to consumers
  const value = {
    currentUser,
    loading,
    login,
    logout,
    register,
    isLoggedIn: !!currentUser,
    isAdmin: hasRole('admin'),
    isHotelOwner: hasRole('hotelOwner'),
    isGuest: hasRole('guest')
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;