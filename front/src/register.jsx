import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    alert(data.msg || data.error || JSON.stringify(data));
  };

  return (
    <div className="card-center bg-gradient">
      <h2>Registro</h2>
      <form onSubmit={handleRegister} className="form-col">
        <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="btn-green">Registrarse</button>
      </form>
    </div>
  );
}




