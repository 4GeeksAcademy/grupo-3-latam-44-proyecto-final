import React, { useEffect, useState } from "react";
import VacanteForm from "../components/VacanteForm";
import { Link } from "react-router-dom";


export const ListaDeVacantes = () => {

  const empresaId = sessionStorage.getItem('user_id')
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [conteoPostulados, setConteoPostulados] = useState({}); // 🟡 Nuevo estado

  // ✅ Obtener listado de vacantes y contar postulados
  const getVacantes = async () => {
    try {
      const res = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/empresa/${empresaId}`);
      const data = await res.json();
      setVacantes(data);

      // 🔄 Por cada vacante, obtenemos cuántos postulados tiene
      data.forEach(v => getPostuladosCount(v.id));
    } catch (error) {
      console.error("Error al cargar vacantes:", error);
    }
  };

  // ✅ Obtener número de postulados por vacante
  const getPostuladosCount = async (vacanteId) => {
    try {
      const res = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/${vacanteId}/postulados`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        }
        });
      const data = await res.json();
      setConteoPostulados(prev => ({
        ...prev,
        [vacanteId]: Array.isArray(data) ? data.length : 0
      }));
    } catch (error) {
      console.error("Error al contar postulados:", error);
      setConteoPostulados(prev => ({ ...prev, [vacanteId]: 0 }));
    }
  };

  useEffect(() => {
    getVacantes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Lista de Vacantes</h2>

      {vacanteSeleccionada ? (
        <VacanteForm
          vacante={vacanteSeleccionada}
          onUpdate={() => {
            setVacanteSeleccionada(null);
            getVacantes();
          }}
        />
      ) : (
        <div className="list-group">
          {vacantes.map((v) => (
            <div
              key={v.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{v.nombre_puesto}</strong> — {v.modalidad}
              </div>
              <div className="d-flex align-items-center gap-2">
                <Link
                  to={`/vacante/${v.id}`}
                  className={`btn ${conteoPostulados[v.id] > 0 ? "btn-success" : "btn-danger"}`}
                >
                  🔍 Ver Detalles
                </Link>
                <Link
                  to={`/vacante/editar/${v.id}`}
                  className={`btn btn-success`}
                >
                  Editar Vacante
                </Link>
                <Link to={`/vacante/${v.id}/postulados`}>
                <span className="badge bg-secondary">
                  {conteoPostulados[v.id] ?? "…"} postulados
                </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
