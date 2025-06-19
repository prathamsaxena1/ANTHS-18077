// components/HotelCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, searchTerm = '' }) => {
  // Function to highlight matching text
  const highlightMatch = (text, term) => {
    if (!term.trim()) return text;
    
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

return (

<div>
  <div className="hotel-card-image">
<img src={hotel.imageUrl || '/default-hotel.jpg'} alt={hotel.name} />

</div>
<div>
<h3>
      {searchTerm ? highlightMatch(hotel.name, searchTerm) : hotel.name}
</h3>
<p>
{hotel.address.city}, {hotel.address.country}

</p>
    <div className="hotel-price">
<span>
${hotel.priceRange.min} - ${hotel.priceRange.max}

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