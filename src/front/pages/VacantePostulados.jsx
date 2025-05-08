import React, { useEffect, useState } from "react";



export const VacantePostulados = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);

  const getTrabajos = async () => {
    try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/<int:vacante_id>/postulados`);

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
      <h2 className="mb-4">📋 Lista de Postulados Vacante:</h2>


    </div>
  );
};


