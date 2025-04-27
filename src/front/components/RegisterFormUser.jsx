import React from "react";

const RegisterFormUser = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      animation: "fadeIn 1s ease-in-out"
    }}>
      <div className="card p-5 shadow-lg border-0" style={{ 
        maxWidth: "420px", 
        width: "100%", 
        borderRadius: "15px", 
        backgroundColor: "white",
        animation: "slideIn 0.8s ease forwards" 
      }}>
        <h2 className="text-center mb-4 fw-bold">Crear cuenta</h2>
        <form>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="nombre" placeholder="Nombre completo" />
            <label htmlFor="nombre">Nombre completo</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="Correo electrónico" />
            <label htmlFor="email">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Contraseña" />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar contraseña" />
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Registrarse
          </button>
        </form>
      </div>

      {/* Animaciones simples en CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterFormUser;
