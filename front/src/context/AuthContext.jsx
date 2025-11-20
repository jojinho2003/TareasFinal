import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [token, user]);

  const logout = () => { 
    setToken(null); 
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
