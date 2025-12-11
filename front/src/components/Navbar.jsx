import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  if (!token) return null;

  return (
    <nav>
      <div className="nav-left">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tareas</Link>
        <Link to="/categories">Categorías</Link>
      </div>

      <div className="nav-right">
        {/* BOTÓN PERFIL — usando el estilo btn-nav que ya tenés */}
        <Link to="/profile" className="btn-nav">
          Perfil
        </Link>

        {/* BOTÓN LOGOUT — usa tu estilo existente */}
        <button onClick={logout} className="btn-logout">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

