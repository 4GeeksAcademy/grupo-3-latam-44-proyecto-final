// ✅ PerfilTrabajador.jsx corregido y listo para producción
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VerPerfilTrabajadorButton from "../components/VerPerfilTrabajadorButton";

export const PerfilTrabajador = () => {
  const { id } = useParams(); // ID del trabajador
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const empresa_id = sessionStorage.getItem("empresa_id"); // ⚠️ Asegúrate de guardar esto tras login
  const trabajo_id = sessionStorage.getItem("trabajo_id"); // ⚠️ Guardar al entrar a detalle de vacante

  useEffect(() => {
    const getPerfil = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/trabajador/${id}?empresa_id=${empresa_id}&trabajo_id=${trabajo_id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (!resp.ok) throw new Error("Error al obtener perfil");

        const data = await resp.json();
        setPerfil(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getPerfil();
  }, [id, token]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!perfil) return <div className="text-center">Cargando perfil...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">👤 Perfil del Trabajador</h2>

      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Apellidos:</strong> {perfil.apellido === "🔒" ? (
        <span className="text-danger">Apellidos ocultos</span>
      ) : perfil.apellido}</p>

      <p><strong>Correo:</strong> {perfil.correo === "🔒" ? (
        <span className="text-danger">Acceso restringido 🔒</span>
      ) : perfil.correo}</p>

      <p><strong>Teléfono:</strong> {perfil.telefono === "🔒" ? (
        <span className="text-danger">Solo disponible con crédito</span>
      ) : perfil.telefono}</p>

      <p><strong>Ubicación:</strong> {perfil.ubicacion}</p>
      <p><strong>Resumen:</strong> {perfil.resumen_profesional}</p>
      <p><strong>Idiomas:</strong> {perfil.idiomas}</p>
      <p><strong>Habilidades:</strong> {perfil.habilidades}</p>

      {perfil.experiencias && (
        <div>
          <h4 className="mt-4">Experiencia Laboral</h4>
          {perfil.experiencias.map((exp, i) => (
            <div key={i} className="mb-2 border-bottom pb-2">
              <strong>{exp.puesto}</strong> en {exp.empresa}<br />
              <small>{exp.inicio} - {exp.fin}</small>
              <p>{exp.responsabilidades}</p>
            </div>
          ))}
        </div>
      )}

      {/* Botón de desbloqueo si hay campos protegidos */}
      {perfil.correo === "🔒" && (
        <div className="alert alert-warning mt-4 d-flex justify-content-between align-items-center">
          <span>👀 Este perfil tiene información protegida.</span>
          <VerPerfilTrabajadorButton trabajadorId={id} vacanteId={trabajo_id} token={token} />
        </div>
      )}
    </div>
  );
};

