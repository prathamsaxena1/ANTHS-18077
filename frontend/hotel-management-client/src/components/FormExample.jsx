// src/components/examples/FormExample.jsx
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

const FormExample = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, you can proceed with submission
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: '',
        agreeTerms: false
      });
      alert('Form submitted successfully!');
    }
  };
  
  const roleOptions = [
    { value: 'guest', label: 'Guest' },
    { value: 'hotelOwner', label: 'Hotel Owner' },
    { value: 'admin', label: 'Administrator' }
  ];
  
  return (
<div>
<h2>
Registration Form

</h2>
  <form onSubmit={handleSubmit}>
    <Input
      label="Full Name"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      placeholder="Enter your full name"
      error={errors.fullName}
      required
    />
    
    <Input
      label="Email Address"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email address"
      error={errors.email}
      required
    />
    
    <Input
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create a password"
      helpText="Password must be at least 6 characters long"
      error={errors.password}
      required
    />
    
    <Select
      label="Role"
      name="role"
      value={formData.role}
      onChange={handleChange}
      options={roleOptions}
      placeholder="Select your role"
      error={errors.role}
      required
    />

    
    <div className="form-buttons">
<Button>
        Cancel
</Button>
<Button>
        Register
</Button>
</div>
  </form>
</div>
);
};

export default FormExample;