import React from "react";
import { Link } from "react-router-dom";
import TrabajadorPostulado from "../components/TrabajadorPostulado";



const TrabajadorPostulado = ({ trabajador }) => {
  return (
    <div className="card p-3 mb-3 shadow-sm border rounded">
      <div className="mb-2">
        <p className="mb-1">
          <strong>👤 Nombre:</strong> {trabajador.nombre} {trabajador.apellido}
        </p>
        <p className="mb-1">
          <strong>📧 Correo:</strong> {trabajador.correo}
        </p>
        <p className="mb-1">
          <strong>📱 Teléfono:</strong> {trabajador.numero}
        </p>
      </div>
      <div className="d-flex justify-content-end">
        <Link
          to={`/trabajador/${trabajador.id}`}
          className="btn btn-outline-primary"
        >
          🔍 Ver Perfil
        </Link>
      </div>
    </div>
  );
};

export default TrabajadorPostulado;

