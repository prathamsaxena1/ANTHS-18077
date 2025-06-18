// pages/auth/Login.jsx
import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  
  // Get redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error('Please provide both email and password');
      }
      
      // Call login from auth context
      const response = await login(formData.email, formData.password, rememberMe);
      
      // If login successful, redirect
      if (response.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would typically redirect to the OAuth provider
      // For this example, we'll just show a placeholder message
      alert(`Redirecting to ${provider} login...`);
      
      // In a real implementation, you would:
      // 1. Redirect to the OAuth provider
      // 2. Handle the callback with a separate route
      // 3. Complete authentication in your backend
      
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
<div>
  <div className="login-card">
    <div className="login-header">
<h1>
Welcome Back

</h1>
<p>
Sign in to continue to Hotel Management

</p>
</div>
    {error && (
<div>
<svg>
<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
</svg>
<span>
{error}

</span>
</div>
    )}
<form>
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
            required
          />
</div>
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
            required
          />

</div>
      </div>
<div>
        <div className="remember-me">
          <input 
            type="checkbox" 
            id="remember" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
<label>
Remember me

</label>
</div>
<Link>
          Forgot password?
</Link>
      </div>
<button>
        {loading ? (
<span className="loading-spinner"></span>

        ) : 'Sign In'}
</button>
</form>
<div>
<span>
or continue with

</span>
</div>
<div>
</div>
<div>
<p>
Don't have an account?

<Link>
Register Now

</Link>
</p>
</div>
  </div>
</div>
);
};

export default Login;