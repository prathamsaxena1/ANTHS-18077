import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes wrapped in MainLayout */}
        <Route>

          <Route index element={<Home />

          } />

          <Route path="login" element={<Login />

          } />

          <Route path="register" element={<Register />

          } />

          {/* Add more public routes here */}
          {/*
<Route path="hotels" element={<Hotels />

} /> /}
{/

<Route path="hotels/:id" element={<HotelDetails />

} /> /}
{/

<Route path="about" element={<About />

} /> */}

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />

          } />

        </Route>
        {/* Protected routes would go here (we'll add these later) */}
        {/* Example:
<Route>
<DashboardLayout />
      </ProtectedRoute>
    }>
<Route index element={<Dashboard />

} />

<Route path="bookings" element={<Bookings />

} />

<Route path="profile" element={<Profile />

} />

</Route>
    */}
      </Routes>
    </Router>
  );
}

export default App;