// src/pages/Listings/ListingsPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyFilters from '../../components/Filters/PropertyFilters';
import PropertyCard from '../../components/PropertyCard';
import Pagination from '../../components/Pagination';
import { useListings } from '../../hooks/useListings';
import './ListingsPage.css';

const ListingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  
  // Get initial filters from URL query params
  const queryParams = new URLSearchParams(location.search);
  const initialFilters = {
    page,
    limit,
  };
  
  // Extract filters from URL
  queryParams.forEach((value, key) => {
    if (key !== 'page' && key !== 'limit') {
      initialFilters[key] = value;
    }
  });
  
  // Use custom hook to fetch and filter listings
  const { 
    listings, 
    loading, 
    error, 
    totalCount, 
    filters, 
    applyFilters 
  } = useListings(initialFilters);

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    applyFilters({ ...filters, page: newPage });
    
    // Update URL query params without triggering a full page reload
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', newPage.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  // Apply filters from filter component
  const handleApplyFilters = (newFilters) => {
    // Reset to page 1 when filters change
    setPage(1);
    applyFilters({ ...newFilters, page: 1, limit });
  };

  return (
<div>
  <div className="listings-header">
<h1>
Find Your Dream Property

</h1>
<p>
Browse through our extensive collection of properties

</p>
</div>
<PropertyFilters 
     onApplyFilters={handleApplyFilters}
     initialFilters={filters}
   />

  {loading && (
<div>
      <div className="spinner">
</div>
<p>
Loading properties...

</p>
    </div>
  )}
  
  {error && (
<div>
<p>
Error: {error}

</p>
</div>
  )}
  
  {!loading && !error && listings.length === 0 && (
<div>
<h3>
No properties found

</h3>
<p>
Try adjusting your filters or browse our featured properties instead.

</p>
</div>
  )}
  
  {!loading && !error && listings.length > 0 && (
    <>
<div>
<p>
Showing {listings.length} of {totalCount} properties

</p>
</div>
<div>
        {listings.map(listing => (
<PropertyCard key={listing._id} property={listing} />
        ))}
</div>
      {totalCount > limit && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / limit)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )}
</div>
);
};

export default ListingsPage;