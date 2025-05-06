// src/front/pages/DashboardAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";

export const DashboardAdmin = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🏛️ Panel de Administración General</h1>

      <div className="row justify-content-center">
        
        {/* Empresas */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">👥 Empresas</h5>
              <p className="card-text">Gestiona todas las empresas registradas.</p>
              <Link to="/admin-empresas" className="btn btn-primary">
                Ver Empresas
              </Link>
            </div>
          </div>
        </div>

        {/* Trabajadores */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">👷‍♂️ Trabajadores</h5>
              <p className="card-text">Gestiona todos los trabajadores registrados.</p>
              <Link to="/admin-trabajadores" className="btn btn-primary">
                Ver Trabajadores
              </Link>
            </div>
          </div>
        </div>

        {/* Pagos */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">💵 Pagos</h5>
              <p className="card-text">Revisa pagos y facturación.</p>
              <Link to="/admin-pagos" className="btn btn-primary">
                Ver Pagos
              </Link>
            </div>
          </div>
        </div>

        {/* Reportes */}
        <div className="col-md-3 mb-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">📊 Reportes</h5>
              <p className="card-text">Consulta métricas y estadísticas.</p>
              <Link to="/admin-reportes" className="btn btn-primary">
                Ver Reportes
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
