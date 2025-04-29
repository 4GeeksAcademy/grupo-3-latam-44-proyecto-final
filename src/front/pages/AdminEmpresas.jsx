// src/front/pages/AdminEmpresas.jsx
import React from "react";

export const AdminEmpresas = () => {
  const empresas = [
    { id: 1, nombre: "Tech Solutions", contacto: "Ana Pérez", ciudad: "CDMX", vacantesPublicadas: 5 },
    { id: 2, nombre: "Marketing Creativo", contacto: "Luis Gómez", ciudad: "Monterrey", vacantesPublicadas: 2 },
    { id: 3, nombre: "Ingeniería Global", contacto: "Sofía Díaz", ciudad: "Guadalajara", vacantesPublicadas: 4 },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard de Empresas</h2>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Nombre Empresa</th>
              <th>Contacto</th>
              <th>Ciudad</th>
              <th>Vacantes Publicadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nombre}</td>
                <td>{empresa.contacto}</td>
                <td>{empresa.ciudad}</td>
                <td>{empresa.vacantesPublicadas}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Ver Perfil</button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
