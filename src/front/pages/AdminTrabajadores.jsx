// src/front/pages/AdminTrabajadores.jsx
import React from "react";

export const AdminTrabajadores = () => {
  const trabajadores = [
    { id: 1, nombre: "Carlos Martínez", email: "carlos@gmail.com", ciudad: "CDMX", puestoDeseado: "Frontend Developer" },
    { id: 2, nombre: "Lucía Ramírez", email: "lucia@gmail.com", ciudad: "Monterrey", puestoDeseado: "Diseñadora UX/UI" },
    { id: 3, nombre: "José Hernández", email: "joseh@gmail.com", ciudad: "Guadalajara", puestoDeseado: "Data Analyst" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard de Trabajadores</h2>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Ciudad</th>
              <th>Puesto Deseado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((trabajador) => (
              <tr key={trabajador.id}>
                <td>{trabajador.id}</td>
                <td>{trabajador.nombre}</td>
                <td>{trabajador.email}</td>
                <td>{trabajador.ciudad}</td>
                <td>{trabajador.puestoDeseado}</td>
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
