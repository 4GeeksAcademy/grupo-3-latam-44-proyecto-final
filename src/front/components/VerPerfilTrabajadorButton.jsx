// src/components/VerPerfilTrabajadorButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const VerPerfilTrabajadorButton = ({ trabajadorId, vacanteId, token }) => {
  const navigate = useNavigate();

  const manejarClick = async () => {
    const confirmacion = window.confirm("⚠️ Al ver este perfil se descontará 1 crédito. ¿Deseas continuar?");
    if (!confirmacion) return;

    try {
      const resp = await fetch("http://localhost:5000/api/creditos/usar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postulante_id: trabajadorId,
          vacante_id: vacanteId,
          accion: "ver_contacto"
        }),
      });

      const resultado = await resp.json();

      if (!resp.ok) {
        // ❌ NO tiene crédito o error → mostrar mensaje amable y profesional
        alert("⚠️ Estimado cliente, no cuenta con créditos. Favor de adquirirlos en nuestra página de pagos y con gusto lo esperamos para seguir atendiendo sus solicitudes. Agradecemos su comprensión.");
        return;
      }

      // ✅ Crédito usado correctamente → redirigimos
      navigate(`/trabajador/${trabajadorId}`);
    } catch (err) {
      alert("⚠️ Error al conectar con el servidor. Intente nuevamente más tarde.");
    }
  };

  return (
    <div className="text-center">
      <button onClick={manejarClick} className="btn btn-outline-primary fw-bold">
        💳 Ver perfil del trabajador
      </button>
    </div>
  );
};

export default VerPerfilTrabajadorButton;

