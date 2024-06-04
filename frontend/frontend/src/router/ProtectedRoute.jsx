// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';

const ProtectedRoute = () => {
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
