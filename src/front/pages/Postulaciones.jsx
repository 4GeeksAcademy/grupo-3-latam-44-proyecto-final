import React, { useEffect, useState } from 'react';

const Postulaciones = () => {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener las postulaciones
    fetch('https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/postulaciones', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token JWT
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las postulaciones');
        }
        return response.json();
      })
      .then((data) => {
        setVacantes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Trabajos a los que te has postulado</h1>
      {vacantes.length > 0 ? (
        <ul className="list-group">
          {vacantes.map((vacante) => (
            <li key={vacante.id} className="list-group-item">
              <h5>{vacante.titulo}</h5>
              <p>{vacante.descripcion}</p>
              <small className="text-muted">Empresa: {vacante.empresa}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No te has postulado a ningún trabajo.</p>
      )}
    </div>
  );
};

export default Postulaciones;