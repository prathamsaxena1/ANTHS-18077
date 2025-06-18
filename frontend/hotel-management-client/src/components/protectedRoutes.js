// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { isLoggedIn, hasRole, loading } = useAuth();

  if (loading) {
    return
<div>
Loading...

</div>
;
}

// If not logged in, redirect to login
if (!isLoggedIn) {
return

<Navigate to="/login" replace />
;
}

// If a specific role is required and user doesn't have it
if (requiredRole && !hasRole(requiredRole)) {
return

<Navigate to="/" replace />
;
}

return children;
}

export default ProtectedRoute;