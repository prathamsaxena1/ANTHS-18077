// src/components/PropertyCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
  };

  return (
<div>
  {property.isSold && <div className="sold-badge">SOLD
</div>
}

<div>
    <img 
      src={property.imageUrls && property.imageUrls.length > 0 
        ? property.imageUrls[0] 
        : '/images/property-placeholder.jpg'
      } 
      alt={property.name}
      loading="lazy"
    />
    <div className="image-overlay">
<span>
        {property.imageUrls ? property.imageUrls.length : 0} Photos
</span>
</div>
  </div>
<div>
    <div className="property-price">
<h3>
        ${formatPrice(property.discountPrice || property.regularPrice)}
        {property.discountPrice && (
<span>
${formatPrice(property.regularPrice)}

</span>
        )}
</h3>
</div>
<h4>
{property.name}

</h4>
<p>
{property.address}

</p>
<div>
<span>
<i className="icon-bed"></i>

{property.bedrooms} Bedrooms

</span>
<span>
<i className="icon-bath"></i>

{property.bathrooms} Bathrooms

</span>
      {property.furnished && (
<span>
<i className="icon-furnished"></i>

Furnished

</span>
      )}
      {property.parking && (
<span>
<i className="icon-parking"></i>

Parking

</span>
      )}
</div>
<div>
      <div className="property-owner">
<img
src={property.owner?.avatar || '/images/default-avatar.jpg'}
alt={property.owner?.username || 'Owner'}
className="owner-avatar"
/>

<span>
{property.owner?.username || 'Owner'}

</span>
</div>
<Link>
        View Details
</Link>
    </div>
  </div>
</div>
);
};

export default PropertyCard;