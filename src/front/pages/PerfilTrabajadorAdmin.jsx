// src/front/pages/AdminTrabajadores.jsx
import React from "react";

export const AdminTrabajadores = () => {
  const trabajadores = [
    { id: 1, nombre: "Carlos Hernández", ciudad: "CDMX", puesto: "Desarrollador Frontend" },
    { id: 2, nombre: "María López", ciudad: "Monterrey", puesto: "Diseñadora UX/UI" },
    { id: 3, nombre: "José Martínez", ciudad: "Guadalajara", puesto: "Analista de Datos" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard de Trabajadores</h2>

      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Puesto Interesado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((trabajador) => (
              <tr key={trabajador.id}>
                <td>{trabajador.id}</td>
                <td>{trabajador.nombre}</td>
                <td>{trabajador.ciudad}</td>
                <td>{trabajador.puesto}</td>
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
