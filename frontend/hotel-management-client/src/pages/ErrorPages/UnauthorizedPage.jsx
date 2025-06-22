
// src/pages/ErrorPages/UnauthorizedPage.jsx
import React from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

const UnauthorizedPage = () => {
  return (
    <ErrorPage
      title="Access Denied"
      message="You don't have permission to access this page. Please log in with appropriate credentials."
      code="401"
      actionText="Log In"
      actionLink="/login"
    />
  );
};

export default UnauthorizedPage;