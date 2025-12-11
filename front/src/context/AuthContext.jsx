import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  // --- Nueva función: obtener usuario logueado ---
  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/api/auth/me", {
        method: "GET",
        headers: { 
          "Authorization": "Bearer " + token 
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);  
      }

    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  };

  // Guarda token y usuario en localStorage
  useEffect(() => {
    if (token) localStorage.setItem('token', token); 
    else localStorage.removeItem('token');

    if (user) localStorage.setItem('user', JSON.stringify(user)); 
    else localStorage.removeItem('user');
  }, [token, user]);

  // Al iniciar la app, cargar usuario si hay token
  useEffect(() => {
    fetchUser();
  }, [token]);

  const logout = () => { 
    setToken(null); 
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

