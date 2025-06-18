// src/pages/auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'guest'
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 50) {
      errors.name = 'Name cannot be longer than 50 characters';
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Password confirmation
    if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing API error
    setApiError('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Remove passwordConfirm before sending to API
      const { passwordConfirm, ...registrationData } = formData;
      await register(registrationData);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div>
  <div className="auth-card">
<h1>
Create Your Account

</h1>
<p>
Join us to access exclusive hotel deals and manage your bookings.

</p>
    {apiError && (
      <div className="error-message">
        {apiError}
</div>
    )}
<form>
<div>
<label>
Full Name

</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={formErrors.name ? 'input-error' : ''}
          placeholder="Enter your full name"
          disabled={isLoading}
        />
        {formErrors.name &&
<span>
{formErrors.name}

</span>
}

</div>
<div>
<label>
Email Address

</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? 'input-error' : ''}
          placeholder="Enter your email"
          disabled={isLoading}
        />
        {formErrors.email &&
<span>
{formErrors.email}

</span>
}

</div>
<div>
<label>
Password

</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={formErrors.password ? 'input-error' : ''}
          placeholder="Create a password"
          disabled={isLoading}
        />
        {formErrors.password &&
<span>
{formErrors.password}

</span>
}

</div>
<div>
<label>
Confirm Password

</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className={formErrors.passwordConfirm ? 'input-error' : ''}
          placeholder="Confirm your password"
          disabled={isLoading}
        />
        {formErrors.passwordConfirm &&
<span>
{formErrors.passwordConfirm}

</span>
}

</div>
<div>
<label>
Account Type

</label>
<select>
<option>
Guest (Book hotels)

</option>
<option>
Hotel Owner (List properties)

</option>
</select>
</div>
<div>
<button>
          {isLoading ? 'Creating Account...' : 'Create Account'}
</button>
</div>
</form>
<div>
<p>
        Already have an account?
<Link>
Login

</Link>
</p>
</div>
  </div>
</div>
);
};

export default Register;