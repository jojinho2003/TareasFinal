import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.msg || "Error al registrar");
      return;
    }

    // ✔ Registro exitoso
    setMsg("Usuario registrado correctamente. Redirigiendo...");

    // ✔ Redirigir al login después de 1.5 segundos
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="card-center bg-gradient">
      <h2>Registro</h2>

      {/* Mensaje de error o éxito */}
      {msg && <p style={{ color: "white", marginBottom: "10px" }}>{msg}</p>}

      <form onSubmit={handleRegister} className="form-col">
        <input 
          placeholder="Nombre" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />

        <input 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />

        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="btn-green">Registrarse</button>
      </form>

      {/* ✔ Link para ir al login */}
      <p style={{ marginTop: "15px", color: "white" }}>
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" style={{ color: "#facc15", fontWeight: "bold" }}>
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}




