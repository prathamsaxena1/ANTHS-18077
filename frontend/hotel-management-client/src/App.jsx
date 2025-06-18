// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import HotelDetail from './pages/HotelDetail/HotelDetail';
import Login from './pages/Auth/Login';
// Import other pages...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/hotel/:id" element={

          <Layout>
            <HotelDetail />
          </Layout>
        } />
        <Route path="/login" element={

<Layout>
  <Login />
</Layout>
} />

      </Routes>
    </Router>
  );
}

export default App;