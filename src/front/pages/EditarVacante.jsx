import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const EditarVacante = () => {

    const userId = sessionStorage.getItem('user_id')
    const { id } = useParams();
    const navigate = useNavigate()


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
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });

            const data = await response.json()
            setModalidad(data.modalidad)
            setDescripcion(data.descripcion)
            setnombrePuesto(data.nombre_puesto)
            setRemuneracion(data.remuneracion)
            setCondiciones(data.condiciones)
            setResponsabilidades(data.responsabilidades)
            setRequerimientos(data.requerimientos)
            setFechaInicio(data.fecha_inicio)
            setFechaVencimiento(data.fecha_vencimiento)

            

            if (!response.ok) {
                throw new Error("Error endpoint");

            }

        } catch (error) {
            console.error(error)
        }
    }


    const handleEditarVacante = async () => {
        const data = {

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacante/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                },
                body: JSON.stringify(data)
            });

            const dataa = await response.json()
            navigate(`/perfil/empresa/${userId}/listado-vacantes`)
            setError(dataa.error)

            if (!response.ok) {
                throw new Error("Error endpoint");

            }
        } catch (error) {


            console.error(error)
        }
    }


    useEffect(() => {
            handleVacante(id)
            }, [id])

    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h3 className="mt-3 fw-bold">Editar Vacante</h3>
                            </div>

                            <hr />

                            <form>
                                <div className="row g-3 pb-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Nombre Puesto</label>
                                        <input type="text" className="form-control"
                                           value={nombrePuesto}
                                           onChange={(e) => {
                                            setnombrePuesto(e.target.value)
                                        }}

                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Modalidad</label>
                                        <input type="text" className="form-control"
                                            value={modalidad}
                                            onChange={(e) => {
                                                setModalidad(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Remuneracion</label>
                                        <input type="text" className="form-control"
                                            value={remuneracion}
                                            onChange={(e) => {
                                                setRemuneracion(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Descripcion</label>
                                        <textarea type="text" className="form-control"
                                            value={descripcion}
                                            onChange={(e) => {
                                                setDescripcion(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label">Condiciones</label>
                                        <textarea type="text" className="form-control"
                                            value={condiciones}
                                            onChange={(e) => {
                                                setCondiciones(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Responsabilidades</label>
                                        <textarea type="text" className="form-control"
                                            value={responsabilidades}
                                            onChange={(e) => {
                                                setResponsabilidades(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Requerimientos</label>
                                        <textarea type="text" className="form-control"
                                            value={requerimientos}
                                            onChange={(e) => {
                                                setRequerimientos(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Fecha Inicio</label>
                                        <input type="date" className="form-control"
                                            value={fechaInicio}
                                            onChange={(e) => {
                                                setFechaInicio(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Fecha Vencimiento</label>
                                        <input type="date" className="form-control"
                                            value={fechaVencimiento}
                                            onChange={(e) => {
                                                setFechaVencimiento(e.target.value)
                                            }}
                                        />
                                    </div>




                                </div>

                                <div className="mt-4 text-center">
                                    <button className="btn btn-outline-primary px-4" type="button"
                                        onClick={handleEditarVacante}
                                    >
                                        Editar Vacante
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
