// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';

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
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
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
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div>
  <div className="auth-card">
<h1>
Login to Your Account

</h1>
<p>
Welcome back! Please enter your credentials to access your account.

</p>
    {apiError && (
      <div className="error-message">
        {apiError}
</div>
    )}
<form>
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
          placeholder="Enter your password"
          disabled={isLoading}
        />
        {formErrors.password &&
<span>
{formErrors.password}

</span>
}

</div>
<div>
<button>
          {isLoading ? 'Logging in...' : 'Login'}
</button>
</div>
</form>
<div>
<p>
        Don't have an account?
<Link>
Sign up

</Link>
</p>
<p>
<Link>
Forgot your password?

</Link>
</p>
</div>
  </div>
</div>
);
};

export default Login;