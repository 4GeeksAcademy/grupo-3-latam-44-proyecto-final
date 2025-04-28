// VacantesDisponibles.jsx
import React, { useEffect, useState } from 'react';

const VacantesDisponibles = () => {
  const [vacantes, setVacantes] = useState([]);

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes`);
        const data = await resp.json();
        if (Array.isArray(data)) {
          setVacantes(data);
        }
      } catch (error) {
        console.error("Error al cargar vacantes:", error);
      }
    };

    fetchVacantes();
  }, []);

  if (vacantes.length === 0) {
    return <p className="text-center mt-4">No hay vacantes disponibles en este momento.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Vacantes Disponibles</h2>
      <div className="row">
        {vacantes.map((v) => (
          <div key={v.id} className="col-md-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{v.nombre_puesto}</h5>
                <p className="card-text"><strong>Modalidad:</strong> {v.modalidad}</p>
                <p className="card-text"><strong>Remuneración:</strong> {v.remuneracion || 'A convenir'}</p>
                <p className="card-text"><strong>Requerimientos:</strong> {v.requerimientos}</p>
                <p className="card-text"><strong>Fecha de publicación:</strong> {new Date(v.fecha_inicio).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacantesDisponibles;
