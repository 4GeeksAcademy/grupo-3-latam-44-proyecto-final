// src/front/pages/Vacantes.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Vacantes = () => {
  const navigate = useNavigate();

  // Vacantes de ejemplo
  const vacantes = [
    { id: 1, titulo: "Desarrollador Frontend", ciudad: "CDMX", modalidad: "Remoto" },
    { id: 2, titulo: "Diseñador UX/UI", ciudad: "Monterrey", modalidad: "Presencial" },
    { id: 3, titulo: "Analista de Datos", ciudad: "Guadalajara", modalidad: "Híbrido" },
    { id: 4, titulo: "Administrador de Redes", ciudad: "Cancún", modalidad: "Remoto" },
    { id: 5, titulo: "Gerente de Marketing", ciudad: "Querétaro", modalidad: "Presencial" },
    { id: 6, titulo: "Programador Backend", ciudad: "Tijuana", modalidad: "Remoto" },
    { id: 7, titulo: "Asistente Administrativo", ciudad: "Puebla", modalidad: "Presencial" },
    { id: 8, titulo: "Soporte Técnico", ciudad: "Toluca", modalidad: "Remoto" },
    { id: 9, titulo: "Ingeniero QA", ciudad: "Mérida", modalidad: "Híbrido" },
    { id: 10, titulo: "Community Manager", ciudad: "CDMX", modalidad: "Remoto" },
    { id: 11, titulo: "Consultor SAP", ciudad: "Guadalajara", modalidad: "Presencial" },
    { id: 12, titulo: "Arquitecto de Software", ciudad: "Monterrey", modalidad: "Remoto" }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const vacantesPorPagina = 6;
  const indexUltimaVacante = currentPage * vacantesPorPagina;
  const indexPrimeraVacante = indexUltimaVacante - vacantesPorPagina;
  const vacantesActuales = vacantes.slice(indexPrimeraVacante, indexUltimaVacante);
  const totalPaginas = Math.ceil(vacantes.length / vacantesPorPagina);

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAnterior = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSiguiente = () => {
    if (currentPage < totalPaginas) setCurrentPage(currentPage + 1);
  };

  const handleVerDetalles = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleRegistro = () => {
    navigate("/registrarme");
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Vacantes Disponibles</h2>

        <div className="row">
          {vacantesActuales.map((vacante) => (
            <div className="col-md-4 mb-4" key={vacante.id}>
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{vacante.titulo}</h5>
                  <p className="card-text">
                    <strong>Ciudad:</strong> {vacante.ciudad}<br />
                    <strong>Modalidad:</strong> {vacante.modalidad}
                  </p>
                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={handleVerDetalles}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary mx-2"
            onClick={handleAnterior}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="align-self-center">
            Página {currentPage} de {totalPaginas}
          </span>
          <button
            className="btn btn-outline-secondary mx-2"
            onClick={handleSiguiente}
            disabled={currentPage === totalPaginas}
          >
            Siguiente
          </button>
        </div>

        {/* Modal de Registro */}
        {mostrarModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={handleCerrarModal}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¡Descubre más oportunidades! 🚀</h5>
                  <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
                </div>
                <div className="modal-body">
                  <p>¿Te gustaría descubrir más sobre esta oportunidad?</p>
                  <p>Regístrate gratis y desbloquea el catálogo completo de vacantes.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleRegistro}>
                    Registrarme Ahora
                  </button>
                  <button className="btn btn-secondary" onClick={handleCerrarModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

