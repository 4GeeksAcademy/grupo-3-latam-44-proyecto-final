
// src/front/pages/Vacantes.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {CardVacanteHome} from "../components/CardVacanteHome"

export const ListaVacantes = () => {
  const navigate = useNavigate();


      const [listadoVacantes, setListadoVacantes] = useState([]);
       const [seleccion, setSeleccion] = useState("")
  
  
  
      const handleListadoVacantes = async()=>{
          try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes`,{
                  method:'GET',
                  headers:{
                      "Content-Type":"application/json"
                  }
                  });
  
              const data = await response.json()
              const listado = []
              data.forEach(element => {
                  
                  listado.push(element.id)
                  
              });
              setListadoVacantes(listado)
              
              
  
          }catch (error) {
              console.log(error)
          }
      }
  
       useEffect(() => {
          handleListadoVacantes()
                  }, [])

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
  const vacantesActuales = listadoVacantes.slice(indexPrimeraVacante, indexUltimaVacante);
  const totalPaginas = Math.ceil(listadoVacantes.length / vacantesPorPagina);

  

  const handleAnterior = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSiguiente = () => {
    if (currentPage < totalPaginas) setCurrentPage(currentPage + 1);
  };

  

  return (
    <>
      <div className="container mt-5 pb-5">
        <h2 className="text-center mb-4">Vacantes Disponibles</h2>

        <div className="row">
          {listadoVacantes.map((vacante) => (
            <CardVacanteHome id={vacante} key={vacante.id}/>
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

       
      </div>
    </>
  )}