import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
<Header />
<main>
<div>
      {children}
</div>
</main>
<Footer />
</>
);
};

export default Layout;