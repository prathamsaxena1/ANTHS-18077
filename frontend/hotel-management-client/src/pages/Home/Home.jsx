// pages/Home/Home.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import HotelCard from '../../components/HotelCard';
import './Home.css';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [visibleHotels, setVisibleHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const ITEMS_PER_PAGE = 8; // Number of hotels to load each time
  
  // Fetch hotels data
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/api/v1/listing/getListings');
        
        // Filter out sold hotels
        const availableHotels = response.data.listings.filter(hotel => !hotel.isSold);
        setHotels(availableHotels);
        
        // Set initial batch of visible hotels
        setVisibleHotels(availableHotels.slice(0, ITEMS_PER_PAGE));
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load hotels');
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Load more hotels when scrolling to the last element
  const loadMoreHotels = useCallback(() => {
    if (loading) return;
    
    const nextPage = page + 1;
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newHotels = hotels.slice(startIndex, endIndex);
    
    if (newHotels.length > 0) {
      setVisibleHotels(prev => [...prev, ...newHotels]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  }, [loading, page, hotels]);

  // Setup the intersection observer
  const lastHotelElementRef = useCallback(node => {
    if (loading) return;
    
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }
    
    // Create a new observer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreHotels();
      }
    }, {
      rootMargin: '100px' // Load more hotels when last card is 100px from viewport
    });
    
    // Observe the last element
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore, loadMoreHotels]);

  if (error) {
    return (
<div>
<h2>
Error loading hotels

</h2>
<p>
{error}

</p>
</div>
);
}

return (

<div>
  <div className="hero-section">
<h1>
Find Your Perfect Stay

</h1>
<p>
Discover amazing hotels for your next trip

</p>
    {/* Search bar or additional content can go here */}
</div>
<div>
<h2>
Popular Hotels

</h2>
    <div className="hotels-grid">
      {visibleHotels.map((hotel, index) => {
        // Add reference to the last hotel element
        if (visibleHotels.length === index + 1) {
          return (
            <div ref={lastHotelElementRef} key={hotel._id}>
<HotelCard hotel={hotel} />
</div>
          );
        } else {
          return (
<div>
<HotelCard hotel={hotel} />
</div>
          );
        }
      })}
    </div>
    
    {loading && (
<div>
        <div className="loading-spinner">
</div>
<p>
Loading hotels...

</p>
      </div>
    )}
    
    {!loading && !hasMore && (
<div>
<p>
You've seen all available hotels

</p>
</div>
    )}
  </div>
</div>
);
};

export default Home;