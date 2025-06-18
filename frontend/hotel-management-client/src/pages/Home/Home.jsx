// pages/Home/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8001/api/v1/listing/getListings');
        
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        
        const data = await response.json();
        console.log('API Response:', data); // For debugging
        
        // Correctly extract the listings array
        if (data && data.listings && Array.isArray(data.listings)) {
          setHotels(data.listings);
        } else {
          setHotels([]);
          console.error('Unexpected data structure:', data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return
<div>
Loading hotels...

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

return (

<div>
  <section className="hero-section">
    <div className="hero-content">
<h1>
Find Your Perfect Stay

</h1>
<p>
Browse our collection of premium hotels for your next destination

</p>
<Link>
Browse All Hotels

</Link>
</div>
  </section>
<section>
<h2>
Featured Hotels

</h2>
<div>
      {hotels.length === 0 ? (
<p>
No hotels available at the moment.

</p>
      ) : (
        hotels.map((hotel) => (
          <div className="hotel-card" key={hotel._id}>
            <div className="hotel-image">
              {hotel.imageUrls && hotel.imageUrls.length > 0 ? (
                <img 
                  src={hotel.imageUrls[0]} 
                  alt={hotel.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-hotel.jpg";
                  }}
                />
              ) : (
<img src="/placeholder-hotel.jpg" alt="Placeholder" />
              )}
</div>
<div>
<h3>
{hotel.name}

</h3>
<p>
{hotel.description?.substring(0, 100)}...

</p>
<p>
{hotel.address}

</p>
              <div className="hotel-details">
                {hotel.parking && (
<span>
Parking Available

</span>
                )}
</div>
<div>
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
${hotel.regularPrice}/night

</span>
                )}
</div>
<Link>
View Details

</Link>
            </div>
          </div>
        ))
      )}
    </div>
</section>
</div>
);
};

export default Home;