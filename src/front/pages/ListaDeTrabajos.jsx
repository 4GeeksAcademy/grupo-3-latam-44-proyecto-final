import React, { useEffect, useState } from "react";

import TrabajoForm from "../../components/TrabajoForm";

const ListaDeTrabajos = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  const getTrabajos = async () => {
    try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajos`);

      const data = await res.json();
      setTrabajos(data);
    } catch (error) {
      console.error("Error al cargar trabajos:", error);
    }
  };

  useEffect(() => {
    getTrabajos();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Lista de Trabajos</h2>

      {trabajoSeleccionado ? (
        <TrabajoForm
          trabajo={trabajoSeleccionado}
          onUpdate={() => {
            setTrabajoSeleccionado(null);
            getTrabajos();
          }}
        />
      ) : (
        <div className="list-group">
          {trabajos.map((t) => (
            <div key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{t.nombre_puesto}</strong> — {t.modalidad}
              </div>
              <button className="btn btn-primary" onClick={() => setTrabajoSeleccionado(t)}>
                Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ListaDeTrabajos;

