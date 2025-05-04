// src/front/components/RegisterFormUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

const RegisterFormUser = () => {
  const navigate = useNavigate();

  // Datos generales
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  // Datos trabajador
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // Datos empresa
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [nombreRP, setNombreRP] = useState("");
  const [apellidoRP, setApellidoRP] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  // Estado
  const [esEmpresa, setEsEmpresa] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [showInvalidPass, setShowInvalidPass] = useState(false);

  const handleRegistro = async () => {
    if (password !== reEnteredPassword || password === "") {
      setShowInvalidPass(true);
      return;
    }

    const commonData = {
      email,
      password,
      telefono,
    };

    try {
      let endpoint = "";
      let body = {};

      if (esAdmin) {
        endpoint = "/admin";
        body = {
          ...commonData,
          nombre,
          apellido,
          es_admin: true
        };
      } else if (esEmpresa) {
        endpoint = "/empresa";
        body = {
          ...commonData,
          nombre_rp: nombreRP,
          apellido_rp: apellidoRP,
          nombreEmpresa,
          razonSocial,
        };
      } else {
        endpoint = "/users";
        body = {
          ...commonData,
          nombre,
          apellido,
        };
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar.");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error interno del servidor.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-3">Crear Cuenta</h2>

        {!esEmpresa && (
          <>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
              <label>Nombre</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" placeholder="Apellido" onChange={e => setApellido(e.target.value)} />
              <label>Apellido</label>
            </div>
          </>
        )}

        {esEmpresa && (
          <>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" placeholder="Nombre Empresa" onChange={e => setNombreEmpresa(e.target.value)} />
              <label>Nombre Empresa</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" placeholder="Nombre Representante" onChange={e => setNombreRP(e.target.value)} />
              <label>Nombre Representante</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" placeholder="Apellido Representante" onChange={e => setApellidoRP(e.target.value)} />
              <label>Apellido Representante</label>
            </div>
          </>
        )}

        <div className="form-floating mb-2">
          <input type="text" className="form-control" placeholder="Teléfono" onChange={e => setTelefono(e.target.value)} />
          <label>Teléfono</label>
        </div>

        <div className="form-floating mb-2">
          <input type="email" className="form-control" placeholder="Correo electrónico" onChange={e => setEmail(e.target.value)} />
          <label>Correo electrónico</label>
        </div>

        <div className="form-floating mb-2">
          <input type="password" className="form-control" placeholder="Contraseña" onChange={e => setPassword(md5(e.target.value))} />
          <label>Contraseña</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" className="form-control" placeholder="Confirmar contraseña" onChange={e => setReEnteredPassword(md5(e.target.value))} />
          <label>Confirmar contraseña</label>
        </div>

        {showInvalidPass && <p className="text-danger">⚠️ Las contraseñas no coinciden</p>}
        {error && <p className="text-danger">{error}</p>}

        <button className="btn btn-primary w-100" onClick={handleRegistro}>
          Registrar {esAdmin ? "Administrador" : esEmpresa ? "Empresa" : "Usuario"}
        </button>

        <div className="form-check form-switch mt-3">
          <input className="form-check-input" type="checkbox" checked={esEmpresa} onChange={() => setEsEmpresa(!esEmpresa)} />
          <label className="form-check-label">Soy Empresa</label>
        </div>

        <div className="form-check form-switch mt-2">
          <input className="form-check-input" type="checkbox" checked={esAdmin} onChange={() => setEsAdmin(!esAdmin)} />
          <label className="form-check-label">Soy Administrador</label>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormUser;
