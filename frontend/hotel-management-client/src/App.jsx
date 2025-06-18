// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Only include the routes for pages we've confirmed are implemented
function App() {
  return (
<Router>
<AuthProvider>
<Layout>
<Routes>
<Route path="/" element={<Home />

} />

<Route path="/login" element={<Login />

} />

<Route path="/register" element={<Register />

} />

        {/* Add these routes only if the corresponding page components exist */}
        {/* If these components don't exist yet, keep them commented out */}
        {/*
<Route path="/hotels" element={<HotelList />

} />

<Route path="/hotels/:id" element={<HotelDetail />

} />
<Route path="/dashboard" element={

<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
        } />
        <Route path="/dashboard/create-hotel" element={
<ProtectedRoute>
<CreateHotel />
</ProtectedRoute>
        } />
        */}
</Routes>
</Layout>
</AuthProvider>
</Router>
);
}

export default App;