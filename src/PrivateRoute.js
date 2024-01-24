// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the component if the user is authenticated
}

export default PrivateRoute;
