// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
// Protected pages
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
<Router>
<AuthProvider>
<Routes>
<Route>
{/* Public Routes */}

<Route index element={<Home />

} />

<Route path="login" element={<Login />

} />

<Route path="register" element={<Register />

} />

        {/* Protected Routes */}

</Route>
</Routes>
</AuthProvider>
</Router>
);
};

export default App;