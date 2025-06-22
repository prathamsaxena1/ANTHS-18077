// pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const isHotelOwner = user?.role === 'hotelOwner' || user?.role === 'admin';

  return (
<div>
<h1>
Dashboard

</h1>
  <div className="welcome-section">
<h2>
Welcome, {user?.name || 'Guest'}!

</h2>
<p>
Manage your account, hotels, and bookings from this dashboard.

</p>
</div>
<div>
    {isHotelOwner && (
      <div className="dashboard-card">
        <div className="card-icon hotel-icon">🏨
</div>
<h3>
My Hotels

</h3>
<p>
Manage your hotel listings, add new properties, and update details.

</p>
<Link>
View My Hotels

</Link>
      </div>
    )}
<div>
      <div className="card-icon booking-icon">📅
</div>
<h3>
My Bookings

</h3>
<p>
View and manage your upcoming and past bookings.

</p>
<Link>
View Bookings

</Link>
    </div>
<div>
      <div className="card-icon profile-icon">👤
</div>
<h3>
Profile Settings

</h3>
<p>
Update your personal information, change password, and manage preferences.

</p>
<Link>
Manage Profile

</Link>
    </div>
    
    {isHotelOwner && (
<div>
        <div className="card-icon add-icon">➕
</div>
<h3>
Add New Hotel

</h3>
<p>
List a new property on our platform and start receiving bookings.

</p>
<Link>
Add Hotel

</Link>
      </div>
    )}
  </div>
</div>
);
};

export default Dashboard;