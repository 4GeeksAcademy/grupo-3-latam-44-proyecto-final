// src/front/pages/Registrarme.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import md5 from 'md5';

export const Registrarme = () => {
  // ... tu componente completo


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [numero, setNumero] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const [nombreRp, setNombreRP] = useState("");
  const [apellidoRp, setApellidoRP] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const [error, setError] = useState("");
  const [toggle, setToggle] = useState({ display: 'none' });
  const [toggleUser, setToggleUser] = useState({ display: 'block' });
  const [estado, setEstado] = useState("");
  const [showInvalidPass, setShowInvalidPass] = useState({ display: 'none' });

  const toggleEmpresa = () => {
    if (estado === "") {
      setToggle({ display: 'block' });
      setToggleUser({ display: 'none' });
      setEstado("active");
    } else {
      setToggle({ display: 'none' });
      setToggleUser({ display: 'block' });
      setEstado("");
    }
  };

  const handleSignup = async () => {
    const data = {
      email: email,
      password: password,
      nombre: nombre,
      apellido: apellido,
      numero: numero
    };
    if (password === reEnteredPassword && password !== "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const dataa = await response.json();
        setError(dataa.error);

        if (!response.ok) {
          throw new Error("Error login endpoint");
        }

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
    }
  };

  const handleSignupEmpresa = async () => {
    const data = {
      email: email,
      password: password,
      nombre_rp: nombreRp,
      apellido_rp: apellidoRp,
      telefono: numero,
      nombreEmpresa: nombreEmpresa,
      razonSocial: razonSocial
    };
    if (password === reEnteredPassword && password !== "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const dataa = await response.json();
        setError(dataa.error);

        if (!response.ok) {
          throw new Error("Error login empresa endpoint");
        }

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa} />
        <label className="form-check-label" htmlFor="switchCheckChecked">Soy Empresa</label>
      </div>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="inputPassword4"
            onChange={(e) => setPassword(md5(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputRePassword4" className="form-label">Reingresa Contraseña</label>
          <input type="password" className="form-control" id="inputRePassword4"
            onChange={(e) => setReEnteredPassword(md5(e.target.value))}
          />
          <div style={showInvalidPass} className="alert">
            Las contraseñas no coinciden
          </div>
        </div>

        {/* Campos para Usuario */}
        <div className="col-12" style={toggleUser}>
          <label htmlFor="inputNombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="inputNombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-12" style={toggleUser}>
          <label htmlFor="inputApellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="inputApellido"
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        {/* Campos para Empresa */}
        <div className="col-12" style={toggle}>
          <label htmlFor="inputNombreRP" className="form-label">Nombre Representante</label>
          <input type="text" className="form-control" id="inputNombreRP"
            onChange={(e) => setNombreRP(e.target.value)}
          />
        </div>
        <div className="col-12" style={toggle}>
          <label htmlFor="inputApellidoRP" className="form-label">Apellido Representante</label>
          <input type="text" className="form-control" id="inputApellidoRP"
            onChange={(e) => setApellidoRP(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputTelefono" className="form-label">Teléfono</label>
          <input type="text" className="form-control" id="inputTelefono"
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div className="col-md-6" style={toggle}>
          <label htmlFor="inputNombreEmpresa" className="form-label">Nombre Empresa</label>
          <input type="text" className="form-control" id="inputNombreEmpresa"
            onChange={(e) => setNombreEmpresa(e.target.value)}
          />
        </div>
        <div className="col-md-6" style={toggle}>
          <label htmlFor="inputRazonSocial" className="form-label">Razón Social</label>
          <input type="text" className="form-control" id="inputRazonSocial"
            onChange={(e) => setRazonSocial(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="col-12" style={toggleUser}>
          <button type="button" onClick={handleSignup} className="btn btn-success w-100">Registrarme</button>
        </div>
        <div className="col-12" style={toggle}>
          <button type="button" onClick={handleSignupEmpresa} className="btn btn-success w-100">Registrar Empresa</button>
        </div>
      </form>
    </div>
  );
};
