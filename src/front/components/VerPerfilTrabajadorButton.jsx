// src/components/VerPerfilTrabajadorButton.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerPerfilTrabajadorButton = ({ trabajadorId, vacanteId, token }) => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false); // Nuevo: para desactivar el botón mientras carga

  const manejarClick = async () => {
    const confirmacion = window.confirm("⚠️ Al ver este perfil se descontará 1 crédito. ¿Deseas continuar?");
    if (!confirmacion) return;

    setCargando(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/creditos/usar`, {
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
        alert("⚠️ Estimado cliente, no cuenta con créditos. Favor de adquirirlos en nuestra página de pagos y con gusto lo esperamos para seguir atendiendo sus solicitudes.");
        return;
      }

      // ✅ Redirige si tuvo éxito
      navigate(`/trabajador/${trabajadorId}`);
    } catch (err) {
      alert("⚠️ Error al conectar con el servidor. Intente nuevamente más tarde.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={manejarClick}
        className="btn btn-outline-primary fw-bold"
        disabled={cargando}
      >
        {cargando ? "🔄 Cargando..." : "💳 Ver perfil del trabajador"}
      </button>
    </div>
  );
};

export default VerPerfilTrabajadorButton;
