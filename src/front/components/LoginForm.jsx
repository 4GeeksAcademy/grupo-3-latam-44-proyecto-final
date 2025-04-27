import React from "react";

const LoginFormUser = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      animation: "fadeIn 1s ease-in-out"
    }}>
      <div className="card p-5 shadow-lg border-0" style={{
        maxWidth: "400px",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "white",
        animation: "slideIn 0.8s ease forwards"
      }}>
        <h2 className="text-center mb-4 fw-bold">Iniciar sesión</h2>
        <form>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="loginEmail" placeholder="Correo electrónico" />
            <label htmlFor="loginEmail">Correo electrónico</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="loginPassword" placeholder="Contraseña" />
            <label htmlFor="loginPassword">Contraseña</label>
          </div>
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
            Entrar
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">¿No tienes cuenta? <a href="/registro" className="text-decoration-none">Regístrate</a></small>
        </div>
      </div>

      {/* Animaciones CSS */}
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

export default LoginFormUser;
