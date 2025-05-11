import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CrearVacante = () => {

  const navigate = useNavigate()

  const empresaId = sessionStorage.getItem('user_id')

  const [modalidad, setModalidad] = useState()
  const [descripcion, setDescripcion] = useState()
  const [nombrePuesto, setnombrePuesto] = useState()
  const [remuneracion, setRemuneracion] = useState()
  const [condiciones, setCondiciones] = useState()
  const [responsabilidades, setResponsabilidades] = useState()
  const [requerimientos, setRequerimientos] = useState()
  const [fechaInicio, setFechaInicio] = useState()
  const [fechaVencimiento, setFechaVencimiento] = useState()

  const handleVacante = async () => {
    const data = {
      "empresa_id": empresaId,
      "modalidad": modalidad,
      "descripcion": descripcion,
      "nombre_puesto": nombrePuesto,
      "remuneracion": remuneracion,
      "condiciones": condiciones,
      "responsabilidades": responsabilidades,
      "requerimientos": requerimientos,
      "fecha_inicio": fechaInicio,
      "fecha_vencimiento": fechaVencimiento
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/empresa/${empresaId}/vacantes`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        },
        body: JSON.stringify(data)
      });

      const dataa = await response.json()

      if (!response.ok) {
        throw new Error("Error endpoint");

      }

      navigate(`/perfil/empresa/${empresaId}/listado-vacantes`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h3 className="mt-3 fw-bold">Nueva Vacante</h3>
              </div>

              <hr />

              <form>
                <div className="row g-3 pb-3">
                  <div className="col-md-12">
                    <label className="form-label">Nombre Puesto</label>
                    <input type="text" className="form-control"
                      onChange={(e) => {
                        setnombrePuesto(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Modalidad</label>
                    <input type="text" className="form-control"
                      onChange={(e) => {
                        setModalidad(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Remuneracion</label>
                    <input type="text" className="form-control"
                      onChange={(e) => {
                        setRemuneracion(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Descripcion</label>
                    <textarea type="text" className="form-control"
                      onChange={(e) => {
                        setDescripcion(e.target.value)
                      }}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Condiciones</label>
                    <textarea type="text" className="form-control"
                      onChange={(e) => {
                        setCondiciones(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Responsabilidades</label>
                    <textarea type="text" className="form-control"
                      onChange={(e) => {
                        setResponsabilidades(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Requerimientos</label>
                    <textarea type="text" className="form-control"
                      onChange={(e) => {
                        setRequerimientos(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Fecha Inicio</label>
                    <input type="date" className="form-control"
                      onChange={(e) => {
                        setFechaInicio(e.target.value)
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Fecha Vencimiento</label>
                    <input type="date" className="form-control"
                      onChange={(e) => {
                        setFechaVencimiento(e.target.value)
                      }}
                    />
                  </div>




                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button"
                    onClick={handleVacante}
                  >
                    Crear Vacante
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
