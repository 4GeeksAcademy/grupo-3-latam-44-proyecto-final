// src/front/pages/PerfilEmpresaAdmin.jsx
import React from "react";
import { useParams } from "react-router-dom";

export const PerfilEmpresaAdmin = () => {
  const { id } = useParams(); // Captura el ID de la URL (en el futuro usaríamos este ID para pedir datos reales)

  // Datos de ejemplo por ahora (luego conectaríamos la API)
  const empresaEjemplo = {
    nombre: "Tech Solutions",
    nombreRepresentante: "Ana Pérez",
    telefono: "555-1234-567",
    correo: "contacto@techsolutions.com",
    ciudad: "CDMX",
    razonSocial: "Tech Solutions S.A. de C.V."
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Perfil de Empresa (Admin)</h2>
      <div className="card p-4 shadow">
        <h4 className="mb-3">{empresaEjemplo.nombre}</h4>
        <p><strong>Representante:</strong> {empresaEjemplo.nombreRepresentante}</p>
        <p><strong>Teléfono:</strong> {empresaEjemplo.telefono}</p>
        <p><strong>Correo Electrónico:</strong> {empresaEjemplo.correo}</p>
        <p><strong>Ciudad:</strong> {empresaEjemplo.ciudad}</p>
        <p><strong>Razón Social:</strong> {empresaEjemplo.razonSocial}</p>

        <div className="d-flex mt-4 gap-2">
          <button className="btn btn-warning">Editar Empresa</button>
          <button className="btn btn-danger">Eliminar Empresa</button>
        </div>
      </div>
    </div>
  );
};
