import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // כאן תוכל לשמור את הטוקן ב-localStorage ולעדכן את ה-state
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    // נקה את הטוקן מ-localStorage ועדכן את ה-state
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};