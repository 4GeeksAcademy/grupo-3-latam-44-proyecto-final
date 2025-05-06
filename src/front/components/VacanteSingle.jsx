import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

export const VacanteSingle = (id) => {

    const navigate = useNavigate();

    console.log(id.id)

    const [nombrePuesto, setNombrePuesto] = useState()
    const [modalidad, setModalidad] = useState()
    const [condiciones, setCondiciones] = useState()
    const [remuneracion, setRemuneracion] = useState()
    const [descripcion, setDescripcion] = useState()
    const [requerimientos, setRequerimientos] = useState()
    const [responsabilidades, setResponsbilidades] = useState()


    const handleExpandVacante = () => {
        navigate(`/vacante/${id.id}`);
      };

    const handleFavorites = () => {
        
    };

    const handleVacante = async(id)=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vacantes/${id}`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
                });

            const data = await response.json()
            setNombrePuesto(data.nombre_puesto)
            setModalidad(data.modalidad)
            setCondiciones(data.condiciones)
            setDescripcion(data.descripcion)
            setRequerimientos(data.requerimientos)
            setResponsbilidades(data.responsabilidades)
            setRemuneracion(data.remuneracion)
            
            console.log(infoVacante)

        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleVacante(id.id)
        }, [id.id])


    return (
        <div className='container border rounded mt-3'>
            <div className='d-flex justify-content-between mt-3 mb-2'>
                <div className='d-flex align-items-center column-gap-3'>
                    <img src="https://picsum.photos/50" className="rounded-circle" alt="..." />
                    <h6>Company Name</h6>
                </div>
                <div>
                    <button type="button" onClick={handleExpandVacante} className="btn"><i className="fa-solid fa-expand"></i></button>
                    <button type="button" className="btn"><i className="fa-regular fa-star" /></button>
                </div>
            </div>
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <h4>{nombrePuesto}</h4>
                    <p>{modalidad}</p>
                </div>
                <div>
                    <button type="button" className="btn btn-outline-success">Postularme</button>
                </div>
            </div>
            <div>
                <div className='border-bottom mb-4'>
                    <div className='d-flex flex-column gap-0'>
                        <p><strong>Renumeracion:</strong></p>
                        <p>${remuneracion}</p>
                    </div>
                    <div className='d-flex flex-column'>
                        <p><strong>Condiciones:</strong></p>
                        <p>{condiciones}</p>
                    </div>
                </div>
                <div className='d-flex flex-column border-bottom mb-4'>
                    <h5 className='text-body-tertiary'><strong>Descripción</strong></h5>
                    <p>
                        {descripcion}
                    </p>
                </div>
                <div className='border-bottom mb-4'>
                    <h5 className='text-body-tertiary'><strong>Requerimientos</strong></h5>
                    <p>
                        {requerimientos}
                    </p>
                </div>
                <div className='mb-5'>
                    <h5 className='text-body-tertiary'><strong>Responsabilidades</strong></h5>
                    <p>
                        {responsabilidades}
                    </p>
                </div>

            </div>

        </div>
    )
}
