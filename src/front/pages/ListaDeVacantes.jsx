import React, { useEffect, useState } from "react";
import VacanteForm from "../components/VacanteForm";
import TrabajadorPostulado from "../components/TrabajadorPostulado";
import { Link } from "react-router-dom";


const ListaDeVacantes = () => {
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [conteoPostulados, setConteoPostulados] = useState({}); // 🟡 Nuevo estado

  // ✅ Obtener listado de vacantes y contar postulados
  const getVacantes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/vacantes");
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
      const res = await fetch(`http://localhost:3001/api/vacantes/${vacanteId}/postulados`);
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
                <span className="badge bg-secondary">
                  {conteoPostulados[v.id] ?? "…"} postulados
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaDeVacantes;
