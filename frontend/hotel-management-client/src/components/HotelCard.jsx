// components/HotelCard/HotelCard.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // When the image is in the viewport (or close to it)
          if (entry.isIntersecting) {
            // Get the image element
            const img = entry.target;
            // Set the src attribute to the data-src value
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);
            // Start loading the image
            img.onload = () => setImageLoaded(true);
            // Stop observing this image
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' }); // Start loading when image is 200px from viewport
      
      // Start observing the image
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
      
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      if (imageRef.current) {
        const src = imageRef.current.getAttribute('data-src');
        imageRef.current.setAttribute('src', src);
        imageRef.current.onload = () => setImageLoaded(true);
      }
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
<div>
  <div className="hotel-card-image">
    <div className={`image-placeholder ${imageLoaded ? 'hidden' : ''}`}>
      <div className="placeholder-shimmer">
</div>
    </div>
    <img
      ref={imageRef}
      src="/placeholder-image.jpg" // Low quality placeholder
      data-src={hotel.imageUrls?.[0] || '/placeholder-hotel.jpg'} // Actual image loaded lazily
      alt={hotel.name}
      className={imageLoaded ? 'loaded' : ''}
      onError={(e) => {
        e.target.src = '/placeholder-hotel.jpg';
        setImageLoaded(true);
      }}
    />
    {hotel.discountPrice && hotel.discountPrice < hotel.regularPrice && (
<div>
        {Math.round((1 - hotel.discountPrice / hotel.regularPrice) * 100)}% OFF
</div>
    )}
  </div>
<div>
<h3>
{hotel.name}

</h3>
<p>
      {hotel.address?.city && hotel.address?.country ? 
        `${hotel.address.city}, ${hotel.address.country}` : 
        'Location not specified'}
</p>
    <div className="hotel-stats">
<span>
{hotel.bedrooms} beds

</span>
<span>
{hotel.bathrooms} baths

</span>
      {hotel.furnished &&
<span>
Furnished

</span>
}

</div>
<div>
      {hotel.discountPrice ? (
        <>
<span>
{formatPrice(hotel.discountPrice)}

</span>
<span>
{formatPrice(hotel.regularPrice)}

</span>
        </>
      ) : (
<span>
{formatPrice(hotel.regularPrice)}

</span>
      )}
<span>
per night

</span>
</div>
  </div>
<Link>
    View Details
</Link>
</div>
);
};

export default HotelCard;