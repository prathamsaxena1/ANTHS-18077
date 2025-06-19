// src/pages/Home/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotels } from '../../hooks/useHotels';
import HotelCard from '../../components/HotelCard';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { hotels, isLoading, error } = useHotels();
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Update filtered hotels whenever the search term or hotels data changes
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      if (searchTerm.trim() === '') {
        // If no search term, show all hotels
        setFilteredHotels(hotels);
      } else {
        // Filter hotels based on search term (case insensitive)
        const results = hotels.filter(hotel => 
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHotels(results);
      }
    } else {
      setFilteredHotels([]);
    }
  }, [searchTerm, hotels]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
<div>
  <section className="hero-section">
    <div className="hero-content">
<h1>
Find Your Perfect Stay

</h1>
<p>
Discover hotels for every need and budget

</p>
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hotels by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
          aria-label="Search hotels"
        />
</div>
      {/* Search results count */}
      {hotels && hotels.length > 0 && searchTerm && (
<p>
          Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''}
</p>
      )}
    </div>
  </section>
<section>
<h2>
Featured Hotels

</h2>
    {isLoading &&
<p>
Loading hotels...

</p>
}
{error &&

<p>
Error loading hotels: {error}

</p>
}

    {!isLoading && !error && filteredHotels.length === 0 && searchTerm && (
<p>
No hotels found matching "{searchTerm}"

</p>
    )}
    
    {!isLoading && !error && hotels && hotels.length === 0 && !searchTerm && (
<p>
No hotels available at the moment.

</p>
    )}
<div>
      {filteredHotels.map(hotel => (
<HotelCard key={hotel._id} hotel={hotel} searchTerm={searchTerm} />
      ))}
</div>
</section>
</div>
);
};

export default Home;