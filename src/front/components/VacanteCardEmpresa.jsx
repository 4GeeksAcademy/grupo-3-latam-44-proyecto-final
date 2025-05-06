// src/front/components/VacanteCardEmpresa.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const VacanteCardEmpresa = ({ vacante, totalPostulantes, onEditar }) => {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm p-3 mb-4 border-start border-3 border-primary">
      <h5 className="text-primary">{vacante.nombre_puesto}</h5>

      <p className="mb-1">
        <strong>💰 Remuneración:</strong> ${vacante.remuneracion} {vacante.moneda || 'MXN'}
      </p>

      <p className="mb-1">
        <strong>👥 Total postulantes:</strong> {totalPostulantes}
      </p>

      <p className="mb-1">
        <strong>Estado:</strong> {vacante.estado || "Activa"}
      </p>

      <hr />

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary w-50"
          onClick={() => navigate(`/vacante/${vacante.id}/postulaciones`)}
        >
          👀 Postulantes
        </button>
        <button
          className="btn btn-outline-warning w-50"
          onClick={() => onEditar(vacante)}
        >
          📝 Editar
        </button>
      </div>
    </div>
  );
};

export default VacanteCardEmpresa;
