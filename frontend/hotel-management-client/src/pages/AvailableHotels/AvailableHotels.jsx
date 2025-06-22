// pages/AvailableHotels/AvailableHotels.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AvailableHotels.css';

const AvailableHotels = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    priceRange: [0, 10000],
    bedrooms: '',
    bathrooms: '',
    furnished: false,
    parking: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/api/v1/listing/getListings');
        
        // Filter out sold listings
        const availableListings = response.data.listings.filter(listing => !listing.isSold);
        setListings(availableListings);
        setFilteredListings(availableListings);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch listings');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    // Apply filters whenever filters state changes
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let tempListings = [...listings];
    
    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      tempListings = tempListings.filter(listing => 
        listing.name.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower) ||
        listing.address.city?.toLowerCase().includes(searchLower) ||
        listing.address.country?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply price range filter
    tempListings = tempListings.filter(listing => {
      const price = listing.discountPrice || listing.regularPrice;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Apply bedrooms filter
    if (filters.bedrooms) {
      tempListings = tempListings.filter(listing => 
        listing.bedrooms >= parseInt(filters.bedrooms)
      );
    }
    
    // Apply bathrooms filter
    if (filters.bathrooms) {
      tempListings = tempListings.filter(listing => 
        listing.bathrooms >= parseInt(filters.bathrooms)
      );
    }
    
    // Apply furnished filter
    if (filters.furnished) {
      tempListings = tempListings.filter(listing => listing.furnished);
    }
    
    // Apply parking filter
    if (filters.parking) {
      tempListings = tempListings.filter(listing => listing.parking);
    }
    
    setFilteredListings(tempListings);
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      searchTerm: e.target.value
    });
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters({
      ...filters,
      priceRange: newPriceRange
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      priceRange: [0, 10000],
      bedrooms: '',
      bathrooms: '',
      furnished: false,
      parking: false
    });
  };

  const formatAddress = (address) => {
    if (!address) return 'Location not specified';
    
    const parts = [];
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);
    
    return parts.join(', ') || 'Location not specified';
  };

  if (loading) {
    return (
<div>
    <div className="loading-spinner">
</div>
<p>
Loading hotels...

</p>
  </div>
);
}

if (error) {
return (

<div>
    <div className="error-icon">⚠️
</div>
<h2>
Error Loading Hotels

</h2>
<p>
{error}

</p>
  </div>
);
}

return (

<div>
  <div className="page-header">
<h1>
Available Hotels

</h1>
<p>
Discover our selection of amazing hotels available for booking

</p>
</div>
<div>
    <div className="filters-section">
      <div className="filter-header">
<h2>
Filters

</h2>
<button>
          Reset
</button>
</div>
<div>
        <input
          type="text"
          placeholder="Search by name, location..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
<span>
🔍

</span>
</div>
<div>
<h3>
Price Range

</h3>
        <div className="price-range-inputs">
          <div className="price-input">
<label>
Min ($)

</label>
            <input
              type="number"
              min="0"
              max={filters.priceRange[1]}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
            />
</div>
<div>
<label>
Max ($)

</label>
            <input
              type="number"
              min={filters.priceRange[0]}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
            />
</div>
        </div>
<div>
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="range-slider"
          />
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="range-slider"
          />
</div>
      </div>
<div>
<h3>
Rooms

</h3>
        <div className="select-group">
<label>
Bedrooms

</label>
<select>
<option>
Any

</option>
<option>
1+

</option>
<option>
2+

</option>
<option>
3+

</option>
<option>
4+

</option>
<option>
5+

</option>
</select>
</div>
<div>
<label>
Bathrooms

</label>
<select>
<option>
Any

</option>
<option>
1+

</option>
<option>
2+

</option>
<option>
3+

</option>
<option>
4+

</option>
</select>
</div>
      </div>
<div>
<h3>
Amenities

</h3>
        <div className="checkbox-group">
<label>
            <input
              type="checkbox"
              name="furnished"
              checked={filters.furnished}
              onChange={handleFilterChange}
            />
            Furnished
</label>
<label>
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleFilterChange}
            />
            Parking
</label>
</div>
      </div>
    </div>
<div>
      <div className="listings-header">
<p>
          {filteredListings.length} {filteredListings.length === 1 ? 'hotel' : 'hotels'} found
</p>
        <div className="sort-dropdown">
<label>
Sort by:

</label>
<select>
<option>
Newest

</option>
<option>
Price: Low to High

</option>
<option>
Price: High to Low

</option>
</select>
</div>
      </div>
      
      {filteredListings.length === 0 ? (
<div>
          <div className="no-results-icon">🏨
</div>
<h2>
No hotels found

</h2>
<p>
Try adjusting your filters to see more results

</p>
<button>
            Clear All Filters
</button>
        </div>
      ) : (
<div>
          {filteredListings.map((listing) => (
            <div className="hotel-card" key={listing._id}>
              <div className="hotel-image">
                <img 
                  src={listing.imageUrls?.[0] || '/placeholder-hotel.jpg'} 
                  alt={listing.name} 
                  onError={(e) => {
                    e.target.src = '/placeholder-hotel.jpg';
                  }}
                />
                {listing.discountPrice && listing.discountPrice < listing.regularPrice && (
                  <div className="discount-badge">
                    {Math.round((1 - listing.discountPrice / listing.regularPrice) * 100)}% OFF
</div>
                )}
              </div>
<div>
<h3>
{listing.name}

</h3>
<p>
{formatAddress(listing.address)}

</p>
                <div className="hotel-features">
<span>
<i>
🛏️

</i>
                    {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
</span>
<span>
<i>
🚿

</i>
                    {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
</span>
                  {listing.parking && (
<span>
<i>
🚗

</i>
                      Parking
</span>
                  )}
                  {listing.furnished && (
<span>
<i>
🪑

</i>
                      Furnished
</span>
                  )}
</div>
<div>
                  {listing.discountPrice && listing.discountPrice < listing.regularPrice ? (
                    <>
<span>
${listing.discountPrice}

</span>
<span>
${listing.regularPrice}

</span>
                    </>
                  ) : (
<span>
${listing.regularPrice}

</span>
                  )}
<span>
per night

</span>
</div>
<div>
                  {listing.description && listing.description.length > 120
                    ? `${listing.description.substring(0, 120)}...`
                    : listing.description}
</div>
              </div>
<div>
<Link>
                  View Details
</Link>
<button>
                  Book Now
</button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
);
};

export default AvailableHotels;