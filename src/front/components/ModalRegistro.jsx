import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ModalRegistro = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Cuando hace poquito scroll
        setMostrarModal(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mostrarModal) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "9999" }}
      onClick={() => setMostrarModal(false)} // Cerrar si hacen click afuera
    >
      <div
        className="bg-white p-5 rounded shadow"
        style={{ maxWidth: "500px", width: "90%" }}
        onClick={(e) => e.stopPropagation()} // Que no cierre si click en modal
      >
        <h3 className="mb-3 text-center">¿Te gustaría descubrir más sobre esta oportunidad? 🚀</h3>
        <p className="text-center mb-4">Regístrate gratis en segundos y desbloquea el catálogo completo de vacantes.</p>
        <div className="d-flex justify-content-center">
          <Link to="/registro" className="btn btn-primary px-4">
            Registrarme Ahora
          </Link>
        </div>
      </div>
    </div>
  );
};
