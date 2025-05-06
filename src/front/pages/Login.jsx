// src/front/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("user"); // 'user' o 'empresa'
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const endpoint =
      tipo === "empresa"
        ? `${import.meta.env.VITE_BACKEND_URL}/login/empresa`
        : `${import.meta.env.VITE_BACKEND_URL}/login/user`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error al iniciar sesión");
        return;
      }

      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("tipo", tipo);

      // Redirección según tipo de usuario
      if (tipo === "empresa") navigate("/perfil-empresa");
      else navigate("/perfil-trabajador");
    } catch (err) {
      console.error(err);
      setError("Error interno del servidor");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Iniciar Sesión</h3>

      <div className="form-group mb-3">
        <label>Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label>Contraseña</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="tipoSwitch"
          onChange={() => setTipo(tipo === "user" ? "empresa" : "user")}
        />
        <label className="form-check-label" htmlFor="tipoSwitch">
          Soy Empresa
        </label>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
