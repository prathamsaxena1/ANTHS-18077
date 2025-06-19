// src/components/HotelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

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

return (

<div>
  <div className="hotel-card-image">
<img src={imageUrl} alt={name} />
</div>
<div>
<h3>
      {searchTerm ? highlightMatch(name, searchTerm) : name}
</h3>
<p>
{city}, {country}

</p>
    <div className="hotel-price">
<span>
${minPrice} - ${maxPrice}

</span>
<span>
per night

</span>
</div>
<Link>
      View Details
</Link>
  </div>
</div>
);
};

export default HotelCard;