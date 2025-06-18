// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import HotelDetail from './pages/HotelDetail/HotelDetail';
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
{/* Other routes... */}

</Routes>
</Router>
);
}

export default App;