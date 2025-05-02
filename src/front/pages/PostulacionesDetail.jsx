// src/pages/PostulacionesDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrabajadorPostulado from "../components/TrabajadorPostulado";

export const PostulacionesDetail = () => {
  const { id } = useParams(); // ID de la vacante desde la URL
  const [postulados, setPostulados] = useState([]);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getPostulados = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/${id}/postulados`);
        if (!resp.ok) throw new Error("No se pudo obtener la lista de postulantes");
        const data = await resp.json();
        setPostulados(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getPostulados();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">👥 Postulantes para esta vacante</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {postulados.length === 0 ? (
        <p className="text-muted">No hay trabajadores postulados aún.</p>
      ) : (
        postulados.map((trabajador) => (
          <TrabajadorPostulado
            key={trabajador.id}
            trabajador={{ ...trabajador, vacante_id: id }}
            token={token}
          />
        ))
      )}
    </div>
  );
};
