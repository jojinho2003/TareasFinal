import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard';
import Login from './login';
import Register from './Register';
import Tasks from './pages/Tasks';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Home from './pages/Home';   // 👈 IMPORTANTE: página pública

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Navbar solo si hay usuario (AuthContext lo controla) */}
        <Navbar />

        <div className="container">
          <Routes>

            {/* 🟢 HOME PÚBLICA */}
            <Route path="/" element={<Home />} />

            {/* 🟡 AUTENTICACIÓN */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔒 RUTAS PRIVADAS */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;







