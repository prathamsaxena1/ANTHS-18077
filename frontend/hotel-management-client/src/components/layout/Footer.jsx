import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
<footer>
<div>
    <div className="footer-content">
      <div className="footer-section">
<h3>
About Us

</h3>
<p>
          Hotel Manager is a platform that helps connect travelers with 
          the perfect accommodations for their journeys.
</p>
        <div className="social-icons">
<a>
<i className="fab fa-facebook-f"></i>

</a>
<a>
<i className="fab fa-twitter"></i>

</a>
<a>
<i className="fab fa-instagram"></i>

</a>
<a>
<i className="fab fa-linkedin-in"></i>

</a>
</div>
      </div>
<div>
<h3>
Quick Links

</h3>
<ul>
<li>
<Link>
Home

</Link>
</li>
          {/* These links can be added when the pages are created */}
          {/*
<li>
<Link>
Hotels

</Link>
</li>
/}
{/

<li>
<Link>
About

</Link>
</li>
/}
{/

<li>
<Link>
Contact

</Link>
</li>
/}
{/

<li>
<Link>
FAQ

</Link>
</li>
*/}

</ul>
</div>
<div>
<h3>
Support

</h3>
<ul>
          {/* These links can be added when the pages are created */}
<li>
<Link>
Help Center

</Link>
</li>
<li>
<Link>
Privacy Policy

</Link>
</li>
<li>
<Link>
Terms of Service

</Link>
</li>
</ul>
</div>
<div>
<h3>
Contact Us

</h3>
<p>
<i className="fas fa-map-marker-alt"></i>

123 Main Street, City, Country

</p>
<p>
<i className="fas fa-envelope"></i>

info@hotelmanager.com

</p>
<p>
<i className="fas fa-phone"></i>

+1 (123) 456-7890

</p>
</div>
    </div>
<div>
<p>
© {year} Hotel Manager. All rights reserved.

</p>
</div>
  </div>
</footer>
);
};

export default Footer;