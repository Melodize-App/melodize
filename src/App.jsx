import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // משתנה חדש לבדיקה אם הבדיקה הראשונית הושלמה
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false); // עדכון שהטעינה הושלמה
  }, []);

  // במקרה של טעינה, אפשר להחזיר null או קומפוננטת טעינה
  if (loading) {
    return null; // או קומפוננטת Spinner לדוגמה
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/*" element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
