// pages/Dashboard/EditHotel.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [hotelData, setHotelData] = useState({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    priceRange: {
      min: '',
      max: ''
    },
    amenities: []
  }); 
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8001/api/v1/listing/${id}`);
        setHotelData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch hotel details');
        setLoading(false);
      }
    };
    
    fetchHotelDetails();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setHotelData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setHotelData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    const amenitiesArray = value.split(',').map(item => item.trim());
    setHotelData(prev => ({
      ...prev,
      amenities: amenitiesArray
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.put(
        `http://localhost:8001/api/v1/listing/${id}`,
        hotelData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSubmitting(false);
      navigate('/dashboard/my-hotels');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update hotel');
      setSubmitting(false);
    }
  };
  
  if (loading) return
<div>
Loading...

</div>
;

return (

<div>
<h1>
Edit Hotel

</h1>
  {error && <div className="error-message">{error}
</div>
}

<form>
<div>
<h2>
Basic Information

</h2>
      <div className="form-group">
<label>
Hotel Name

</label>
        <input
          type="text"
          id="name"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          required
        />
</div>
<div>
<label>
Description

</label>
<textarea id="description" name="description" value={hotelData.description} onChange={handleChange} rows="4" required ></textarea>
</div>
    </div>
<div>
<h2>
Address

</h2>
      <div className="form-group">
<label>
Street

</label>
        <input
          type="text"
          id="address.street"
          name="address.street"
          value={hotelData.address.street}
          onChange={handleChange}
          required
        />
</div>
<div>
        <div className="form-group">
<label>
City

</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            value={hotelData.address.city}
            onChange={handleChange}
            required
          />
</div>
<div>
<label>
State/Province

</label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            value={hotelData.address.state}
            onChange={handleChange}
            required
          />
</div>
      </div>
<div>
        <div className="form-group">
<label>
Zip/Postal Code

</label>
          <input
            type="text"
            id="address.zipCode"
            name="address.zipCode"
            value={hotelData.address.zipCode}
            onChange={handleChange}
            required
          />
</div>
<div>
<label>
Country

</label>
          <input
            type="text"
            id="address.country"
            name="address.country"
            value={hotelData.address.country}
            onChange={handleChange}
            required
          />
</div>
      </div>
    </div>
<div>
<h2>
Pricing

</h2>
      <div className="form-row">
        <div className="form-group">
<label>
Minimum Price (per night)

</label>
          <input
            type="number"
            id="priceRange.min"
            name="priceRange.min"
            value={hotelData.priceRange.min}
            onChange={handleChange}
            min="0"
            required
          />
</div>
<div>
<label>
Maximum Price (per night)

</label>
          <input
            type="number"
            id="priceRange.max"
            name="priceRange.max"
            value={hotelData.priceRange.max}
            onChange={handleChange}
            min="0"
            required
          />
</div>
      </div>
    </div>
<div>
<h2>
Amenities

</h2>
      <div className="form-group">
<label>
Amenities (comma-separated)

</label>
<textarea id="amenities" name="amenities" value={hotelData.amenities.join(', ')} onChange={handleAmenitiesChange} rows="3" placeholder="wifi, pool, gym, etc." ></textarea>
<small>
Enter amenities separated by commas (e.g., wifi, pool, gym)

</small>
</div>
    </div>
<div>
<button>
        {submitting ? 'Updating...' : 'Update Hotel'}
</button>
</div>
</form>
</div>
);
};

export default EditHotel;