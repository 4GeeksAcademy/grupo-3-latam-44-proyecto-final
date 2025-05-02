// src/front/pages/AdminReportes.jsx
import React from "react";

export const AdminReportes = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Reportes Administrativos</h2>

      <div className="alert alert-info text-center">
        Aquí se mostrarán los reportes por empresa, trabajador, vacantes, ingresos, etc.
      </div>

      <div className="text-center">
        <p className="mb-1">🔍 Filtros por fecha, estado y forma de pago estarán disponibles aquí.</p>
        <p>🧾 También se podrá exportar a Excel, PDF o Word con encabezado personalizado.</p>
      </div>
    </div>
  );
};
