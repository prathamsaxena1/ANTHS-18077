// pages/auth/Register.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };
  
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };
  
  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0: return '';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very Strong';
      default: return '';
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset submit error
    setSubmitError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      
      // If registration successful, redirect to home
      if (response.success) {
        navigate('/');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
<div>
  <div className="register-card">
    <div className="register-header">
<h1>
Create an Account

</h1>
<p>
Join our Hotel Management platform

</p>
</div>
    {submitError && (
<div>
<svg>
<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
</svg>
<span>
{submitError}

</span>
</div>
    )}
<form>
<div>
<label>
Full Name

</label>
        <div className="input-wrapper">
<svg>
<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
</svg>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.name ? 'error' : ''}
          />
</div>
        {errors.name &&
<p>
{errors.name}

</p>
}
</div>

<div>
<label>
Email Address

</label>
        <div className="input-wrapper">
<svg>
<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
</svg>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={errors.email ? 'error' : ''}
          />
</div>
        {errors.email &&
<p>
{errors.email}

</p>
}
</div>

<div>
<label>
Password

</label>
        <div className="input-wrapper">
<svg>
<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
</svg>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={errors.password ? 'error' : ''}
          />
</div>
        {formData.password && (
<div>
            <div className="strength-meter">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index}
                  className={`strength-segment ${index < passwordStrength ? `strength-level-${passwordStrength}` : ''}`}
                >
</div>
              ))}
            </div>
<span>
              {getPasswordStrengthLabel()}
</span>
          </div>
        )}
        {errors.password &&
<p>
{errors.password}

</p>
}

<p>
          Use 8+ characters with a mix of letters, numbers & symbols
</p>
      </div>
<div>
<label>
Confirm Password

</label>
        <div className="input-wrapper">
<svg>
<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
</svg>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={errors.confirmPassword ? 'error' : ''}
          />
</div>
        {errors.confirmPassword &&
<p>
{errors.confirmPassword}

</p>
}
</div>

<div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox" 
            id="terms" 
            checked={agreedToTerms}
            onChange={() => setAgreedToTerms(!agreedToTerms)}
            className={errors.terms ? 'error' : ''}
          />
<label>
            I agree to the
<a>
Terms and Conditions

</a>
and

<a>
Privacy Policy

</a>
</label>
</div>
        {errors.terms &&
<p>
{errors.terms}

</p>
}
</div>

<button>
        {loading ? (
<span className="loading-spinner"></span>

        ) : 'Create Account'}
</button>
</form>
<div>
<p>
Already have an account?

<Link>
Sign In

</Link>
</p>
</div>
  </div>
</div>
);
};

export default Register;