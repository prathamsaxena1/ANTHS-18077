// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import "./global.css"

function App() {
  return (
<Router>
<Layout>
<Routes>
<Route path="/" element={<Home />

} />

<Route path="/login" element={<Login />

} />

<Route path="/register" element={<Register />

} />
<Route path="*" element={

<div>
Page not found

</div>
} />

</Routes>
</Layout>
</Router>
);
}

export default App;