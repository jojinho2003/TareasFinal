import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "80px",
      padding: "20px"
    }}>
      <h1>Bienvenido a Alejo control</h1>
      <p style={{ maxWidth: "500px", margin: "20px auto" }}>
        Aplicación sencilla para gestionar tus tareas y categorías.
        Registrate o iniciá sesión para acceder a tu panel personal.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Iniciar sesión</button>
        </Link>

        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}
