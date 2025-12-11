import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Cargando datos del usuario...</p>;

  return (
    <div className="container">
      <h1 className="dashboard-title">Mi Perfil</h1>

      <div className="dashboard-box">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user._id}</p>
      </div>

      <button 
        onClick={logout} 
        style={{ marginTop: "20px", backgroundColor: "#ef4444" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
