// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Public pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import HotelList from './pages/HotelList';
import HotelDetail from './pages/HotelDetail';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// These pages would be created later
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import CreateHotel from './pages/hotel/CreateHotel';
// import AdminPanel from './pages/admin/AdminPanel';

// Styles
import './styles/global.css';

const App = () => {
  return (
<Router>
<AuthProvider>
<Routes>
<Route>
}>
{/* Public Routes - Accessible to all visitors */}

<Route index element={<Home />

} />

<Route path="login" element={<Login />

} />

<Route path="register" element={<Register />

} />

<Route path="hotels" element={<HotelList />

} />

<Route path="hotels/:id" element={<HotelDetail />

} />

<Route path="unauthorized" element={<Unauthorized />

} />

        {/* Protected Routes - Only for authenticated users */}
        <Route 
          path="dashboard" 
          element={
<ProtectedRoute>
              {/*
<Dashboard />
*/}

<div>
Dashboard Page (Protected)

</div>
</ProtectedRoute>
          } 
        />
        
        <Route 
          path="profile" 
          element={
<ProtectedRoute>
              {/*
<Profile />
*/}

<div>
Profile Page (Protected)

</div>
</ProtectedRoute>
          } 
        />
        
        {/* Role-based Protected Routes - Only for specific user roles */}
        <Route 
          path="dashboard/create-hotel" 
          element={
<ProtectedRoute>
              {/*
<CreateHotel />
*/}

<div>
Create Hotel Page (Protected, Hotel Owner or Admin only)

</div>
</ProtectedRoute>
          } 
        />
        
        <Route 
          path="admin" 
          element={
<ProtectedRoute>
              {/*
<AdminPanel />
*/}

<div>
Admin Panel (Protected, Admin only)

</div>
</ProtectedRoute>
          } 
        />
        
        {/* 404 Route - Always at the end */}
<Route path="*" element={<NotFound />

} />

</Route>
</Routes>
</AuthProvider>
</Router>
);
};

export default App;