// src/pages/Profile/UserProfile.jsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import HotelCard from '../../components/HotelCard';
import './UserProfile.css';

const UserProfile = () => {
  // Get email from URL if provided (for viewing other users' profiles)
  const { email } = useParams();
  
  // Fetch user data (profile and listings)
  const { userProfile, userListings, isLoading, error } = useUserProfile(email);
  
  // State for profile tabs (if you want to add more sections later)
  const [activeTab, setActiveTab] = useState('listings');
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // If loading, show a loading state
  if (isLoading) {
    return (
<div>
    <div className="profile-loading">
      <div className="loading-spinner">
</div>
<p>
Loading profile data...

</p>
    </div>
  </div>
);
}

// If error, show error state
if (error) {
return (

<div>
    <div className="profile-error">
<h3>
Error Loading Profile

</h3>
<p>
{error}

</p>
<Link>
Back to Home

</Link>
</div>
  </div>
);
}

// If no user profile is found
if (!userProfile) {
return (

<div>
    <div className="profile-not-found">
<h3>
User Not Found

</h3>
<p>
We couldn't find information for this user.

</p>
<Link>
Back to Home

</Link>
</div>
  </div>
);
}

return (

<div>
  {/* User Profile Header */}
  <div className="profile-header">
<div>
<h1>
{userProfile.name}

</h1>
<p>
{userProfile.email}

</p>
      {userProfile.role && (
<p>
<span>
{userProfile.role}

</span>
</p>
      )}
      
      <div className="profile-stats">
        <div className="stat-item">
<span>
{userListings.length}

</span>
<span>
Properties

</span>
</div>
        {/* Add more stats here if needed */}
      </div>
    </div>
  </div>
  
  {/* Profile Tabs */}
<div>
    {/* Add more tabs here if needed */}
</div>
  {/* Profile Content */}
<div>
    {/* Listings Tab Content */}
    {activeTab === 'listings' && (
      <div className="listings-tab">
        {userListings.length === 0 ? (
          <div className="no-listings">
<h3>
No Properties Listed

</h3>
<p>
{userProfile.name} hasn't listed any properties yet.

</p>
            {userProfile.email === email && (
<Link>
                Create Your First Listing
</Link>
            )}
</div>
        ) : (
          <>
<div>
<h2>
Properties ({userListings.length})

</h2>
              {userProfile.email === email && (
<Link>
                  Add New Property
</Link>
              )}
</div>
<div>
              {userListings.map(listing => (
<HotelCard key={listing._id} hotel={listing} />
              ))}
</div>
          </>
        )}
      </div>
    )}
    
    {/* Add more tab content here if needed */}
  </div>
</div>
);
};

export default UserProfile;