import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import { showToast } from "../utils/toastUtils";

const RegisterFormUser = () => {
  const navigate = useNavigate();

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredpassword, setReEnteredPassword] = useState("");
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreRp, setNombreRP] = useState("");
  const [apellidoRp, setApellidoRP] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [estado, setEstado] = useState("");
  const [toggle, setToggle] = useState({ display: "none" });
  const [toggleUser, setToggleUSer] = useState({ display: "block" });

  const toggleEmpresa = () => {
    if (estado === "") {
      setToggle({ display: "block" });
      setToggleUSer({ display: "none" });
      setEstado("active");
    } else {
      setToggle({ display: "none" });
      setToggleUSer({ display: "block" });
      setEstado("");
    }
  };

  const handleSignup = async () => {
    if (password !== reEnteredpassword || !password) {
      showToast("⚠️ Las contraseñas no coinciden", "warning");
      return;
    }

    const data = {
      email,
      password,
      nombre,
      apellido,
      numero,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Error en el registro");

      showToast("Usuario registrado correctamente", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      showToast("Error al registrar usuario", "error");
    }
  };

  const handleSignupEmpresa = async () => {
    if (password !== reEnteredpassword || !password) {
      showToast("⚠️ Las contraseñas no coinciden", "warning");
      return;
    }

    const data = {
      email,
      password,
      nombre_rp: nombreRp,
      apellido_rp: apellidoRp,
      telefono: numero,
      nombreEmpresa,
      razonSocial,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Error en el registro");

      showToast("Empresa registrada correctamente", "save");
      navigate("/");
    } catch (error) {
      console.error(error);
      showToast("Error al registrar empresa", "error");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)",
        animation: "fadeIn 1s ease-in-out",
        fontFamily: "Segoe UI, sans-serif"
      }}>
      <div className="card p-5 pb-4 shadow border-0"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          animation: "slideIn 0.8s ease forwards"
        }}>
        <h2 className="text-center mb-4 fw-bold" style={toggleUser}>Crear cuenta</h2>
        <h2 className="text-center mb-4 fw-bold" style={toggle}>Crear Empresa</h2>
        <form>
          {/* Usuario */}
          <div className="form-floating mb-3" style={toggleUser}>
            <input type="text" className="form-control" id="nombre" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
            <label htmlFor="nombre">Nombre</label>
          </div>
          {/* Empresa */}
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="nombreEmpresa" placeholder="Nombre Empresa" onChange={(e) => setNombreEmpresa(e.target.value)} />
            <label htmlFor="nombreEmpresa">Nombre Empresa</label>
          </div>
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="razonSocial" placeholder="Razon Social" onChange={(e) => setRazonSocial(e.target.value)} />
            <label htmlFor="razonSocial">Razón Social</label>
          </div>
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="nombreRp" placeholder="Nombre Representante" onChange={(e) => setNombreRP(e.target.value)} />
            <label htmlFor="nombreRp">Nombre Representante</label>
          </div>
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="apellidoRp" placeholder="Apellido Representante" onChange={(e) => setApellidoRP(e.target.value)} />
            <label htmlFor="apellidoRp">Apellido Representante</label>
          </div>
          <div className="form-floating mb-3" style={toggleUser}>
            <input type="text" className="form-control" id="apellido" placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />
            <label htmlFor="apellido">Apellido</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="telefono" placeholder="Teléfono" onChange={(e) => setNumero(e.target.value)} />
            <label htmlFor="telefono">Teléfono</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Contraseña" onChange={(e) => setPassword(md5(e.target.value))} />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar contraseña" onChange={(e) => setReEnteredPassword(md5(e.target.value))} />
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
          </div>

          <button type="button" className="btn btn-success w-100 py-2 fw-bold mb-2" style={toggleUser} onClick={handleSignup}>Registrarse</button>
          <button type="button" className="btn btn-primary w-100 py-2 fw-bold" style={toggle} onClick={handleSignupEmpresa}>Registrar Empresa</button>
        </form>

        <div className="pt-3 form-check form-switch d-flex justify-content-end gap-3">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa} />
          <label className="form-check-label" htmlFor="switchCheckChecked">Soy Empresa</label>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RegisterFormUser;
