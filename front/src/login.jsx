import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, setUser, logout } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.token) {
      setToken(data.token);
      setUser(data.user || { email });
      alert("Login exitoso!");
    } else {
      alert(data.msg || "Error en login");
    }
  };

  // Si ya hay token, mostrar botón de cerrar sesión
  if (token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">¡Bienvenido!</h2>
          <p className="mb-6">Ya estás logueado como {JSON.parse(localStorage.getItem('user'))?.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Ingresar</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Ingresar
          </button>
          {/* Enlace a Register */}
          <p className="text-center mt-4">
            ¿No tenés cuenta? <Link to="/register" className="text-blue-500 hover:underline">Registrate acá</Link>
          </p>
        </form>
      </div>
    </div>
  );
}









