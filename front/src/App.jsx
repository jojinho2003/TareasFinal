import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './Login';
import Register from './Register';
import Tasks from './pages/Tasks';
import Categories from './pages/Categories';
import './App.css';

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tareas</Link>
        <Link to="/categories">Categorías</Link>
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="btn-nav">Login</Link>
            <Link to="/register" className="btn-nav">Registro</Link>
          </>
        ) : (
          <button onClick={logout} className="btn-logout">Cerrar sesión</button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Bienvenido a la web de creación de tareas</h1>
                  <p>Selecciona una sección del menú para comenzar.</p>
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;




