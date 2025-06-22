// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import HotelDetail from './pages/HotelDetail/HotelDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserProfile from './pages/Profile/UserProfile';
import EditHotel from './pages/Dashborad/EditHotel';
import AvailableHotels from './pages/AvailableHotels/AvailableHotels';
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
        <Route path="/register" element={

          <Layout>
            <Register />
          </Layout>
        } />
        <Route path="/user" element={

          <Layout>
            <UserProfile />
          </Layout>
        } />
        <Route path="/edithotel" element={

          <Layout>
            <EditHotel />
          </Layout>
        } />
        <Route path="/availableHotels" element={

          <Layout>
            <AvailableHotels />
          </Layout>
        } />

      </Routes>
    </Router>
  );
}

export default App;