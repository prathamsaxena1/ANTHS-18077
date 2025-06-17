// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelsPage from './pages/HotelsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home/Home';
import './global.css';

function App() {
  return (
<Router>
<Layout>
<Routes>
<Route path="/" element={<HomePage />

} />

<Route path="/hotels" element={<HotelsPage />

} />

<Route path="/hotels/:id" element={<HotelDetailPage />

} />

<Route path="/login" element={<LoginPage />

} />

<Route path="/register" element={<RegisterPage />

} />

<Route path="/profile" element={<ProfilePage />

} />

<Route path="/about" element={<AboutPage />

} />

<Route path="/contact" element={<ContactPage />

} />

<Route path="*" element={<NotFoundPage />

} />

</Routes>
</Layout>
</Router>
);
}

export default App;