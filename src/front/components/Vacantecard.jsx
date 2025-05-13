import React, {useState, useEffect} from 'react'

export const Vacantecard = ({id, handleSeleccion}) => {

        const [nombrePuesto, setNombrePuesto] = useState()
        const [modalidad, setModalidad] = useState()
        const [empresaId, setEmpresaId] = useState()
        const [nombreEmpresa, setNombreEmpresa] = useState()


    
    
        const handleVacante = async()=>{
            try {
                const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/vacantes/${id}`,{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                    });
    
                const data = await response.json()
                setNombrePuesto(data.nombre_puesto)
                setModalidad(data.modalidad)
                setEmpresaId(data.empresa_id)
            
    
            }catch (error) {
                console.log(error)
            }
        }

        const handleEmpresa = async(empresaId)=>{
            try {
                const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/empresa/${empresaId}`,{
                    method:'GET',
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                    });
    
                const data = await response.json()
                setNombreEmpresa(data.nombre)
            
    
            }catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            handleVacante()
            handleEmpresa(empresaId)
            }, [])
    

  return (
    <div className='d-flex flex-column justify-content-center border rounded p-3'>
        <div className='d-flex justify-content-between align-items-center'>
            <h6>{nombreEmpresa}</h6>
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