// src/front/components/TrabajadorPostulado.jsx
import React from "react";
import VerPerfilTrabajadorButton from "./VerPerfilTrabajadorButton";

const TrabajadorPostulado = ({ trabajador, token }) => {
  return (
    <div className="card p-3 mb-3 shadow-sm border rounded">
      <div className="mb-2">
        <p className="mb-1">
          <strong>👤 Nombre:</strong> {trabajador.nombre}
        </p>
        <p className="mb-1">
          <strong>📧 Correo:</strong> 🔒 Solo visible con crédito
        </p>
        <p className="mb-1">
          <strong>📱 Teléfono:</strong> 🔒 Solo visible con crédito
        </p>
      </div>
      <div className="d-flex justify-content-end">
        {/* ✅ Botón ya limpio y funcional */}
        <VerPerfilTrabajadorButton
          trabajadorId={trabajador.id}
          vacanteId={trabajador.vacante_id}
          token={token}
        />
      </div>
    </div>
  );
};

export default TrabajadorPostulado;
