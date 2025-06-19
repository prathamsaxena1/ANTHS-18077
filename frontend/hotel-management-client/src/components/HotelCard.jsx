// components/HotelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HotelCard.css';

const HotelCard = ({ hotel, searchTerm = '' }) => {
  // Function to safely access nested properties
  const safelyGetNestedProp = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((prev, curr) => {
      return prev && prev[curr] !== undefined ? prev[curr] : defaultValue;
    }, obj);
  };

  // Function to highlight matching text
  const highlightMatch = (text, term) => {
    if (!term.trim() || !text) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ?
<span>
{part}

</span>
: part
);
};

// Safely get required properties with fallbacks
const name = safelyGetNestedProp(hotel, 'name', 'Unnamed Hotel');
const city = safelyGetNestedProp(hotel, 'address.city', 'Unknown City');
const country = safelyGetNestedProp(hotel, 'address.country', 'Unknown Country');
const minPrice = safelyGetNestedProp(hotel, 'priceRange.min', 0);
const maxPrice = safelyGetNestedProp(hotel, 'priceRange.max', 0);
const imageUrl = safelyGetNestedProp(hotel, 'imageUrl', '/default-hotel.jpg');
const id = safelyGetNestedProp(hotel, '_id', '');
const rating = safelyGetNestedProp(hotel, 'rating', null);

// Get amenities if available
const amenities = safelyGetNestedProp(hotel, 'amenities', []);
// Take only first 3 amenities to display
const displayAmenities = amenities.slice(0, 3);

return (

<div>
  {rating && <div className="hotel-rating">{rating}/5
</div>
}

<div>
<img src={imageUrl} alt={name} />
</div>
<div>
<h3>
      {searchTerm ? highlightMatch(name, searchTerm) : name}
</h3>
<p>
{city}, {country}

</p>
    {displayAmenities.length > 0 && (
      <div className="hotel-amenities">
        {displayAmenities.map((amenity, index) => (
<span>
{amenity}

</span>
        ))}
</div>
    )}
<div>
      <div>
<span>
${minPrice} - ${maxPrice}

</span>
<span>
per night

</span>
</div>
    </div>
<Link>
      View Details
</Link>
  </div>
</div>
);
};

export default HotelCard;