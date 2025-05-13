import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";


export const CardVacanteHome = (id) => {

  const navigate = useNavigate();
  const [nombrePuesto, setNombrePuesto] = useState()
  const [modalidad, setModalidad] = useState()
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleVerDetalles = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  const handleRegistro = () => {
    navigate("/registrarme");
  };


  const handleVacante = async () => {
    try {
      const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/${id.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json()
      setNombrePuesto(data.nombre_puesto)
      setModalidad(data.modalidad)


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleVacante()
  }, [])


  return (
    <div className="col-md-4 mb-4" key={id}>
      <div className="card h-100 shadow">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombrePuesto}</h5>
          <p className="card-text">
            <strong>Ciudad:</strong> Ciudad<br />
            <strong>Modalidad:</strong> {modalidad}
          </p>
          <button
            className="btn btn-outline-primary mt-auto"
            onClick={handleVerDetalles}
          >
            Ver Detalles
          </button>
        </div>
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
  )
}
