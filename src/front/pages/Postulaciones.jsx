import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export const Postulaciones = () => {

 const userId = sessionStorage.getItem('user_id')
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVacantes = async (userId) => {
    try {
      const res = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/postulaciones/${userId}`);
      const data = await res.json();
      setVacantes(data);
    } catch (error) {
      console.error("Error al cargar vacantes:", error);
    }
  };


  useEffect(() => {
    getVacantes(userId)

  }, [])


  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Trabajos a los que te has postulado</h1>
      <div className="list-group">
        {vacantes.map((v) => (
          <div
            key={v.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{v.nombre}</strong> — {v.modalidad} — {v.empresa}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};