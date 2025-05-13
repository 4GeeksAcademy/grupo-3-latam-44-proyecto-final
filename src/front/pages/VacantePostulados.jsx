import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export const VacantePostulados = () => {

    const userId = sessionStorage.getItem('user_id')
    const { id } = useParams();
    const [postulantes, setPostulantes] = useState([]);
    const [nombreVacante, setNombreVacante] = useState(null);

    const getPostulantes = async () => {
        try {

            const res = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/${id}/postulados`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                }
            );

            const data = await res.json();
            setPostulantes(data);
        } catch (error) {
            console.error("Error al cargar trabajos:", error);
        }
    };
    const getNombrePostulacion = async () => {
        try {

            const res = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                }
            );

            const data = await res.json();
            setNombreVacante(data.nombre_puesto);
        } catch (error) {
            console.error("Error al cargar trabajos:", error);
        }
    };

    useEffect(() => {
        getPostulantes();
        getNombrePostulacion();
    }, []);

    return (
        <div className="container mt-5">
            <Link to={`/perfil/empresa/${userId}/listado-vacantes`}>
            <button type="button" className="btn btn-success my-3">Volver</button>
            </Link>
            <h2 className="mb-4">📋 Lista de Postulados Vacante: {nombreVacante}</h2>
            <div className="list-group">
                      {postulantes.map((v) => (
                        <div
                          key={v.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <p>{v.nombre}</p>
                            <p>{v.apellido}</p>
                            <p>{v.numero}</p>
                            <p>{v.correo}</p>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Link to={`/perfil/trabajador/${v.id}`}>
                            <button type="button" className="btn btn-success">Ver perfil</button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>


        </div>
    );
};


