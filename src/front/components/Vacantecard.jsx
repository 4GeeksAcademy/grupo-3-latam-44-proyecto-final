import React, {useState, useEffect} from 'react'

export const Vacantecard = ({id, handleSeleccion}) => {

        const [nombrePuesto, setNombrePuesto] = useState()
        const [modalidad, setModalidad] = useState()

    
    
        const handleVacante = async()=>{
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
            
    
            }catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            handleVacante()
            }, [])
    

  return (
    <div className='d-flex flex-column justify-content-center border rounded p-3'>
        <div className='d-flex justify-content-between align-items-center'>
            <h6>Company Name</h6>
            <button type="button" className="btn"><i className="fa-regular fa-star" /></button>
        </div>
        <div className='d-flex flex-column'>
            <h4>{nombrePuesto}</h4>
            <p>{modalidad}</p>
        </div>
        <div>
            <button type="button" className="btn btn-success btn-sm" onClick={()=>handleSeleccion(id)}>Ver</button>
        </div>
    </div>
  )
}