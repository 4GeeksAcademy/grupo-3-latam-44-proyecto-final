import React, { useEffect, useState } from "react";
import { NavbarHome } from "../components/NavbarHome";
import { Vacantecard } from "../components/Vacantecard";
import { VacanteSingle } from "../components/VacanteSingle";

export const Vacantes = () => {

    const [listadoVacantes, setListadoVacantes] = useState([]);
     const [seleccion, setSeleccion] = useState("")

    
    const handleSeleccion = (id) => {
        setSeleccion(id)
    }
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


    return (
        
            <div className="row mt-5">
                <div className="col-3">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                        { listadoVacantes.map((x) => (
                            <span >
                            <Vacantecard id={x} handleSeleccion={handleSeleccion}/>
                            </span>
                        ))
                        }
                        </nav>
                    </nav>
                </div>
                <div className="col-8">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
                        <div id="item-1">
                            <VacanteSingle id={seleccion}/>
                        </div>
                    </div>
                </div>
            </div>
    );
};