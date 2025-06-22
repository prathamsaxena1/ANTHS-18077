// components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userFromStorage && token) {
      const parsedUser = JSON.parse(userFromStorage);
      setIsLoggedIn(true);
      setUser(parsedUser);
      setUserRole(parsedUser.role || 'guest');
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setUserRole('guest');
    }
  }, [location.pathname]); // Re-check when path changes

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    setUserRole('guest');
    setIsUserMenuOpen(false);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
<header>
<div>
    <div className="navbar-logo">
<Link>
<img src="/logo.svg" alt="Hotel Management" />
<span>
HotelStay

</span>
</Link>
</div>
<nav>
<ul>
<li>

            <ul className="dropdown-menu">
              <li>
<NavLink>
                  Dashboard
</NavLink>
</li>
<li>
<NavLink>
                  My Hotels
</NavLink>
</li>
<li>
<NavLink>
                  Add Hotel
</NavLink>
</li>
              {userRole === 'admin' && (
<li>
<NavLink>
                    Manage Users
</NavLink>
</li>
              )}
</ul>
          </li>

      </ul>
<div>
        {isLoggedIn ? (
          <div className="user-menu" ref={userMenuRef}>
            <button 
              className="user-menu-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
</div>
<span>
{user?.name || 'User'}

</span>
<i>
▼

</i>
            </button>
<ul>
<li>
<div>
{user?.email}

</div>
<div>
{userRole.charAt(0).toUpperCase() + userRole.slice(1)}

</div>
</li>
<li>
<NavLink>
<i>
👤

</i>
Profile

</NavLink>
</li>
              {(userRole === 'hotelOwner' || userRole === 'admin') && (
<li>
<NavLink>
<i>
📊

</i>
Dashboard

</NavLink>
</li>
              )}
<li>
<NavLink>
<i>
🗓️

</i>
My Bookings

</NavLink>
</li>
<li>
<button>
<i>
🚪

</i>
Logout

</button>
</li>
</ul>
          </div>
        ) : (
<div>
<NavLink>
Login

</NavLink>
<NavLink>
Register

</NavLink>
</div>
        )}
      </div>
</nav>
  </div>
</header>
);
};

export default Header;