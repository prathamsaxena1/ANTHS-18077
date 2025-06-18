// pages/HotelDetail/HotelDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './HotelDetail.css';

const HotelDetail = () => {
  const { id } = useParams(); // Get the hotel ID from URL parameters
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8001/api/v1/listing/get/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch hotel with ID: ${id}`);
        }
        
        const data = await response.json();
        setHotel(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (id) {
      fetchHotelDetail();
    }
  }, [id]);

  if (loading) {
    return
<div>
Loading hotel details...

</div>
;
}

if (error) {
return

<div>
Error: {error}

</div>
;
}

if (!hotel) {
return

<div>
Hotel not found

</div>
;
}

return (

<div>
  <div className="back-link-container">
<Link>
← Back to Hotels

</Link>
</div>
<h1>
{hotel.name}

</h1>
<div>
{hotel.address}

</div>
<div>
    <div className="main-image">
      <img 
        src={hotel.imageUrls[activeImage]} 
        alt={`${hotel.name} - Image ${activeImage + 1}`} 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder-hotel.jpg";
        }}
      />
</div>
<div>
      {hotel.imageUrls.map((url, index) => (
        <div 
          key={index} 
          className={`thumbnail ${activeImage === index ? 'active' : ''}`}
          onClick={() => setActiveImage(index)}
        >
          <img 
            src={url} 
            alt={`${hotel.name} - Thumbnail ${index + 1}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-hotel.jpg";
            }}
          />
</div>
      ))}
    </div>
  </div>
<div>
    <div className="hotel-info-section">
<h2>
About this place

</h2>
<p>
{hotel.description}

</p>
      <div className="hotel-features">
<h3>
What this place offers

</h3>
        <div className="features-grid">
          {hotel.parking && (
            <div className="feature-item">
<span>
🅿️

</span>
<span>
Parking

</span>
</div>
          )}
          {hotel.wifi && (
<div>
<span>
📶

</span>
<span>
WiFi

</span>
</div>
          )}
          {hotel.bedrooms && (
<div>
<span>
🛏️

</span>
<span>
{hotel.bedrooms} Bedroom{hotel.bedrooms > 1 ? 's' : ''}

</span>
</div>
          )}
          {hotel.bathrooms && (
<div>
<span>
🚿

</span>
<span>
{hotel.bathrooms} Bathroom{hotel.bathrooms > 1 ? 's' : ''}

</span>
</div>
          )}
          {/* Add more features as needed */}
        </div>
      </div>
    </div>
<div>
      <div className="booking-card">
        <div className="booking-price">
          {hotel.discountPrice && hotel.discountPrice < hotel.regularPrice ? (
            <>
<span>
${hotel.regularPrice}

</span>
<span>
${hotel.discountPrice}

</span>
            </>
          ) : (
<span>
${hotel.regularPrice}

</span>
          )}
<span>
/night

</span>
</div>
<button>
Book Now

</button>
<div>
<p>
Free cancellation up to 7 days before check-in

</p>
<p>
Contact host for availability

</p>
</div>
      </div>
    </div>
  </div>
</div>
);
};

export default HotelDetail;