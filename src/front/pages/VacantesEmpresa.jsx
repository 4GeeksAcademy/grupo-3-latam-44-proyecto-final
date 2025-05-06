import React, { useEffect, useState } from "react";
import VacanteCardEmpresa from "../components/VacanteCardEmpresa";
import VacanteForm from "../components/VacanteForm";

export const VacantesEmpresa = () => {
  const [vacantes, setVacantes] = useState([]);
  const [conteoPostulados, setConteoPostulados] = useState({});
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);

  // 🔄 Cargar todas las vacantes
  const getVacantes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes`);
      const data = await res.json();
      setVacantes(data);

      // Para cada vacante, obtener total de postulantes
      data.forEach((v) => getPostuladosCount(v.id));
    } catch (error) {
      console.error("❌ Error al cargar vacantes:", error);
    }
  };

  // 🔢 Obtener el número de postulantes de una vacante
  const getPostuladosCount = async (vacanteId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/${vacanteId}/postulados`);
      const data = await res.json();
      setConteoPostulados((prev) => ({
        ...prev,
        [vacanteId]: Array.isArray(data) ? data.length : 0
      }));
    } catch (error) {
      setConteoPostulados((prev) => ({ ...prev, [vacanteId]: 0 }));
    }
  };

  useEffect(() => {
    getVacantes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📋 Vacantes Publicadas</h2>

      {vacanteSeleccionada ? (
        <>
          <VacanteForm
            vacante={vacanteSeleccionada}
            onSubmit={async (formData) => {
              // PUT para actualizar la vacante
              try {
                const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/${vacanteSeleccionada.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(formData)
                });

                if (!resp.ok) throw new Error("❌ Error al guardar");

                alert("✅ Vacante actualizada con éxito");
                setVacanteSeleccionada(null);
                getVacantes(); // recarga la lista
              } catch (err) {
                alert(err.message);
              }
            }}
          />

          <button
            className="btn btn-secondary mt-3"
            onClick={() => setVacanteSeleccionada(null)}
          >
            🔙 Volver a la lista
          </button>
        </>
      ) : (
        <div className="row">
          {vacantes.length === 0 ? (
            <p className="text-muted text-center">Aún no hay vacantes.</p>
          ) : (
            vacantes.map((v) => (
              <div className="col-md-4" key={v.id}>
                <VacanteCardEmpresa
                  vacante={v}
                  totalPostulantes={conteoPostulados[v.id] ?? 0}
                  onEditar={(vacante) => setVacanteSeleccionada(vacante)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

