import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return isAuthenticated ? setIsAuthenticated : <Navigate to="/login" replace />;
}
