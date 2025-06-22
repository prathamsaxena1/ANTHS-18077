// src/pages/ErrorPages/NotFoundPage.jsx
import React from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

const NotFoundPage = () => {
  return (
    <ErrorPage
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      code="404"
      actionText="Return Home"
      actionLink="/"
    />
  );
};

export default NotFoundPage;