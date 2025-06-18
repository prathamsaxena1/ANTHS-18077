// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelListings = async () => {
      try {
        setLoading(true);
        
        // Fetch hotels owned by the current user
        const response = await fetch(`${import.meta.env.VITE_API_URL}/hotels/my-hotels`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch your hotels');
        }
        
        setHotels(data.data || []);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err.message || 'Failed to load your hotel listings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotelListings();
  }, []);

  const handleAddHotel = () => {
    navigate('/dashboard/create-hotel');
  };

  if (loading) {
    return (
<div>
    <div className="dashboard-loading">
      <div className="spinner">
</div>
<p>
Loading your hotels...

</p>
    </div>
  </div>
);
}

return (

<div>
  <div className="dashboard-header">
    <div className="dashboard-welcome">
<h1>
Hotel Owner Dashboard

</h1>
<p>
Welcome back, {user?.name}!

</p>
</div>
<button>
      Add New Hotel
</button>
  </div>
  
  {!error && hotels.length === 0 ? (
<div>
      <div className="empty-state-icon">🏨
</div>
<h2>
No Hotels Yet

</h2>
<p>
You haven't added any hotel listings yet. Get started by adding your first property!

</p>
<button>
        Add Your First Hotel
</button>
    </div>
  ) : (
<div>
<h2>
Your Hotels ({hotels.length})

</h2>
      <div className="hotel-grid">
        {hotels.map(hotel => (
          <div className="hotel-card" key={hotel._id}>
            <div className="hotel-card-image">
              {hotel.images && hotel.images.length > 0 ? (
<img src={hotel.images[0]} alt={hotel.name} />
              ) : (
                <div className="placeholder-image">No Image
</div>
              )}
            </div>
<div>
<h3>
{hotel.name}

</h3>
<p>
                {hotel.address.city}, {hotel.address.country}
</p>
              <div className="hotel-metrics">
                <div className="metric">
<span>
${hotel.priceRange?.min || 0}

</span>
<span>
Starting Price

</span>
</div>
<div>
<span>
                    {hotel.bookings?.length || 0}
</span>
<span>
Bookings

</span>
</div>
              </div>
            </div>
<div>
<Link>
                View Details
</Link>
<Link>
                Edit
</Link>
</div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
);
};

export default Dashboard;