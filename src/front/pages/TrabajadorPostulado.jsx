import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";



export const TrabajadorPostulado = () => {
  const { id } = useParams();


  //infor user
    const [mail, setMail] = useState()
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [numero, setNumero] = useState()
  
    //info perfil
    const [fechaNacimiento, setFechaNacimiento] = useState()
    const [lugar, setLugar] = useState()
    const [acerca, setAcerca] = useState()
    
  
    //info cv
    const [portafolio, setPortafolio] = useState()
    const [experiencia, setExperiencia] = useState()
    const [cursos, setCursos] = useState()
    const [capacitaciones, setCapacitaciones] = useState()
    const [estudios, setEstudios] = useState()
    const [idiomas, setIdiomas] = useState()
    const [tecnologia, setTecnologia] = useState()
  

  const handleUserInfo = async(id)=>{
    try {
        const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/trabajador/${id}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
            }
            });

        const data = await response.json()
        setMail(data.email)
        setNombre(data.nombre)
        setApellido(data.apellido)
        setNumero(data.numero)

    

    }catch (error) {
        console.log(error)
    }
}



const handlePerfilInfo = async(id)=>{
  try {
      const response = await fetch(`$https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/trabajador-perfil/${id}`,{
          method:'GET',
          headers:{
              "Content-Type":"application/json",
              "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
          }
          });

      const data = await response.json()
      setFechaNacimiento(data.fecha_nacimiento)
      setLugar(data.lugar)
      setAcerca(data.acerca)

  

  }catch (error) {
      console.log(error)
  }
}

const handleCVInfo = async(id)=>{
try {
    const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/trabajador-cv/${id}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        }
        });

    const data = await response.json()
    setPortafolio(data.portafolio)
    setExperiencia(data.experiencia)
    setCursos(data.cursos)
    setCapacitaciones(data.capacitaciones)
    setEstudios(data.estudios)
    setIdiomas(data.idiomas)
    setTecnologia(data.tecnologia)




}catch (error) {
    console.log(error)
}
}

useEffect(() => {
            handleUserInfo(id)
            handlePerfilInfo(id)
            handleCVInfo(id)
              }, [])


  return (
    <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <img
                src="https://picsum.photos/150"
                alt="avatar"
                className="rounded-circle shadow"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="mt-3 fw-bold">{nombre} {apellido}</h3>
            </div>

            <hr />

            <div>
              <h3 className="pb-3">Información Basica</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <h5>Nombre:</h5>
                  <p>{nombre}</p>
                </div>
                <div className="col-md-6">
                  <h5>Apellido:</h5>
                  <p>{apellido}</p>
                </div>
                <div className="col-md-6">
                  <h5>Correo:</h5>
                  <p>{mail}</p>
                </div>
                <div className="col-md-6">
                  <h5>Teléfono:</h5>
                  <p>{numero}</p>
                </div>
              </div>
            </div>
            <hr />

            <div>
              <h3 className="pb-3">Información Adicional</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <h5>Fecha Nacimiento:</h5>
                  <p>{fechaNacimiento}</p>
                </div>
                <div className="col-md-6">
                  <h5>Lugar:</h5>
                  <p>{lugar}</p>
                </div>
                <div className="col-md-12">
                  <h5>Acerca:</h5>
                  <p>{acerca}</p>
                </div>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="pb-3">CV</h3>
              <div className="row g-3">
                <div className="col-md-12">
                  <h5>Portafoli:</h5>
                  <p>{portafolio}</p>
                </div>
                <div className="col-md-12">
                  <h5>Experiencia:</h5>
                  <p>{experiencia}</p>
                </div>
                <div className="col-md-12">
                  <h5>Cursos:</h5>
                  <p>{cursos}</p>
                </div>
                <div className="col-md-12">
                  <h5>Capacitaciones:</h5>
                  <p>{capacitaciones}</p>
                </div>
                <div className="col-md-12">
                  <h5>Estudios:</h5>
                  <p>{estudios}</p>

                </div>
                <div className="col-md-12">
                  <h5>Idiomas:</h5>
                  <p>{idiomas}</p>
                </div>
                <div className="col-md-12">
                  <h5>Tecnologia:</h5>
                  <p>{tecnologia}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

