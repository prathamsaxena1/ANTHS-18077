// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

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
</Routes>
</Layout>
</AuthProvider>
</Router>
);
}

export default App;