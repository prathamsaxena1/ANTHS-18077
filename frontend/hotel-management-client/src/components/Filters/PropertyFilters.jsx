// src/components/Filters/PropertyFilters.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PropertyFilters.css';

const PropertyFilters = ({ onApplyFilters, initialFilters = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',                   // Text search for name/description/address
    minPrice: '',                 // Minimum price
    maxPrice: '',                 // Maximum price
    minBedrooms: '',              // Minimum bedrooms
    maxBedrooms: '',              // Maximum bedrooms  
    minBathrooms: '',             // Minimum bathrooms
    maxBathrooms: '',             // Maximum bathrooms
    furnished: null,              // true, false, or null (any)
    parking: null,                // true, false, or null (any)
    isSold: false,                // Show sold properties
    createdAfter: null,           // Created after date
    createdBefore: null,          // Created before date
    updatedAfter: null,           // Updated after date
    updatedBefore: null,          // Updated before date
    ownerSearch: '',              // Search by owner username or email
    sort: 'createdAt_desc',       // Default sort order
    ...initialFilters             // Apply any initial filters passed from parent
  });

  // Effect to initialize filters from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filterParams = {};
    
    // Extract query parameters
    for (const [key, value] of queryParams.entries()) {
      // Convert string booleans to actual booleans
      if (value === 'true' || value === 'false') {
        filterParams[key] = value === 'true';
      }
      // Convert dates from ISO strings
      else if (['createdAfter', 'createdBefore', 'updatedAfter', 'updatedBefore'].includes(key) && value) {
        filterParams[key] = new Date(value);
      }
      // Convert numeric values
      else if (['minPrice', 'maxPrice', 'minBedrooms', 'maxBedrooms', 'minBathrooms', 'maxBathrooms'].includes(key)) {
        filterParams[key] = value ? Number(value) : '';
      }
      // All other string values
      else {
        filterParams[key] = value;
      }
    }
    
    // Only update if there are parameters and they differ from current state
    if (Object.keys(filterParams).length > 0) {
      setFilters(prev => ({
        ...prev,
        ...filterParams
      }));
    }
  }, [location.search]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFilters({
        ...filters,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name) => {
    // Cycle through true -> false -> null (any)
    // When a user first checks a box, it indicates they want this feature (true)
    // When they check it again, it indicates they don't want this feature (false)
    // When they check it a third time, it indicates they don't care (null)
    const currentValue = filters[name];
    let newValue = null;
    
    if (currentValue === null) newValue = true;
    else if (currentValue === true) newValue = false;
    else newValue = null;
    
    setFilters({
      ...filters,
      [name]: newValue
    });
  };

  // Handle date picker changes
  const handleDateChange = (date, name) => {
    setFilters({
      ...filters,
      [name]: date
    });
  };

  // Apply filters
  const applyFilters = () => {
    // Create URL query parameters
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      // Skip empty or null values
      if (value === null || value === '') return;
      
      // Handle dates
      if (value instanceof Date) {
        queryParams.append(key, value.toISOString());
      }
      // Handle all other types
      else {
        queryParams.append(key, value);
      }
    });
    
    // Update URL with query parameters
    navigate(`${location.pathname}?${queryParams.toString()}`);
    
    // Call parent callback
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  // Reset filters
  const resetFilters = () => {
    // Reset to defaults
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      minBathrooms: '',
      maxBathrooms: '',
      furnished: null,
      parking: null,
      isSold: false,
      createdAfter: null,
      createdBefore: null,
      updatedAfter: null,
      updatedBefore: null,
      ownerSearch: '',
      sort: 'createdAt_desc'
    });
    
    // Update URL
    navigate(location.pathname);
    
    // Call parent callback
    if (onApplyFilters) {
      onApplyFilters({});
    }
  };
  
  // Toggle advanced filters
  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  // Render checkbox with three states
  const renderTriStateCheckbox = (name, label) => {
    const value = filters[name];
    let displayClass = 'checkbox-any';
    let displayText = 'Any';
    
    if (value === true) {
      displayClass = 'checkbox-yes';
      displayText = 'Yes';
    } else if (value === false) {
      displayClass = 'checkbox-no';
      displayText = 'No';
    }
    
    return (
<div>
<label>
{label}

</label>
    <div 
      className={`tri-state-checkbox ${displayClass}`}
      onClick={() => handleCheckboxChange(name)}
      role="checkbox"
      aria-checked={value === null ? 'mixed' : value}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleCheckboxChange(name);
        }
      }}
    >
      {displayText}
</div>
  </div>
);
};

return (

<div>
  <div className="filter-basic-section">
    <div className="filter-group search-group">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by property name, description or address"
        className="search-input"
      />
</div>
<div>
      <div className="filter-group">
<label>
Price Range ($)

</label>
        <div className="range-inputs">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            min="0"
            className="number-input"
          />
<span>
</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            min="0"
            className="number-input"
          />
</div>
      </div>
<div>
<label>
Bedrooms

</label>
        <div className="range-inputs">
          <input
            type="number"
            name="minBedrooms"
            value={filters.minBedrooms}
            onChange={handleChange}
            placeholder="Min"
            min="0"
            className="number-input"
          />
<span>
</span>
          <input
            type="number"
            name="maxBedrooms"
            value={filters.maxBedrooms}
            onChange={handleChange}
            placeholder="Max"
            min="0"
            className="number-input"
          />
</div>
      </div>
<div>
<label>
Bathrooms

</label>
        <div className="range-inputs">
          <input
            type="number"
            name="minBathrooms"
            value={filters.minBathrooms}
            onChange={handleChange}
            placeholder="Min"
            min="0"
            step="0.5"
            className="number-input"
          />
<span>
</span>
          <input
            type="number"
            name="maxBathrooms"
            value={filters.maxBathrooms}
            onChange={handleChange}
            placeholder="Max"
            min="0"
            step="0.5"
            className="number-input"
          />
</div>
      </div>
<div>
<label>
Status

</label>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="isSold"
            name="isSold"
            checked={filters.isSold}
            onChange={() => setFilters({...filters, isSold: !filters.isSold})}
          />
<label>
Include Sold

</label>
</div>
      </div>
    </div>
<div>
<button>
        {isAdvancedOpen ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
</button>
      <div className="main-actions">
<button>
Reset

</button>
<button>
Apply Filters

</button>
</div>
    </div>
  </div>

  {isAdvancedOpen && (
<div>
      <div className="advanced-filter-row">
        {renderTriStateCheckbox('furnished', 'Furnished')}
        {renderTriStateCheckbox('parking', 'Parking')}
</div>
<div>
        <div className="filter-group">
<label>
Created Between

</label>
          <div className="date-range-inputs">
            <DatePicker
              selected={filters.createdAfter}
              onChange={(date) => handleDateChange(date, 'createdAfter')}
              selectsStart
              startDate={filters.createdAfter}
              endDate={filters.createdBefore}
              placeholderText="From"
              dateFormat="MM/dd/yyyy"
              className="date-input"
              isClearable
            />
            <DatePicker
              selected={filters.createdBefore}
              onChange={(date) => handleDateChange(date, 'createdBefore')}
              selectsEnd
              startDate={filters.createdAfter}
              endDate={filters.createdBefore}
              placeholderText="To"
              dateFormat="MM/dd/yyyy"
              className="date-input"
              isClearable
            />
</div>
        </div>
<div>
<label>
Updated Between

</label>
          <div className="date-range-inputs">
            <DatePicker
              selected={filters.updatedAfter}
              onChange={(date) => handleDateChange(date, 'updatedAfter')}
              selectsStart
              startDate={filters.updatedAfter}
              endDate={filters.updatedBefore}
              placeholderText="From"
              dateFormat="MM/dd/yyyy"
              className="date-input"
              isClearable
            />
            <DatePicker
              selected={filters.updatedBefore}
              onChange={(date) => handleDateChange(date, 'updatedBefore')}
              selectsEnd
              startDate={filters.updatedAfter}
              endDate={filters.updatedBefore}
              placeholderText="To"
              dateFormat="MM/dd/yyyy"
              className="date-input"
              isClearable
            />
</div>
        </div>
      </div>
<div>
        <div className="filter-group">
<label>
Owner

</label>
          <input
            type="text"
            name="ownerSearch"
            value={filters.ownerSearch}
            onChange={handleChange}
            placeholder="Search by owner username or email"
            className="text-input"
          />
</div>
<div>
<label>
Sort By

</label>
<select>
<option>
Newest First

</option>
<option>
Oldest First

</option>
<option>
Price: Low to High

</option>
<option>
Price: High to Low

</option>
<option>
Name: A-Z

</option>
<option>
Name: Z-A

</option>
</select>
</div>
      </div>
    </div>
  )}
</div>
);
};

export default PropertyFilters;