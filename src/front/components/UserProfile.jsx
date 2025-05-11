import { div } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

const UserProfile = (id) => {


  const  userId  = sessionStorage.getItem('user_id')

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


  
      console.log(userId)
      
          const handleUserInfo = async(userId)=>{
              try {
                  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajador/${userId}`,{
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



          const handlePerfilInfo = async(userId)=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajador-perfil/${userId}`,{
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

        const handleCVInfo = async(userId)=>{
          try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajador-cv/${userId}`,{
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


      const handlePerfil = async () => {
        const data = {
          "fechaNacimiento": fechaNacimiento,
          "lugar": lugar,
          "acerca": acerca,
          "userId":sessionStorage.getItem('user_id')
        };
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajador/perfil`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
              },
              body: JSON.stringify(data)
            });
    
            const dataa = await response.json()
            setError(dataa.error)
    
            if (!response.ok) {
              throw new Error("Error endpoint");
    
            }
          } catch (error) {
    
    
            console.error(error)
          }
      }



      const handleCV = async () => {
        const data = {
          "portafolio": portafolio,
          "experiencia": experiencia,
          "cursos": cursos,
          "capacitaciones": capacitaciones,
          "estudios": estudios,
          "idiomas": idiomas,
          "tecnologia": tecnologia,
          "userId":sessionStorage.getItem('user_id')
        };
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trabajador/cv`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
              },
              body: JSON.stringify(data)
            });
    
            const dataa = await response.json()
            setError(data.error)
    
            if (!response.ok) {
              throw new Error("Error endpoint");
    
            }
          } catch (error) {
    
    
            console.error(error)
          }
      }




      
          useEffect(() => {
            handleUserInfo(userId)
            handlePerfilInfo(userId)
            handleCVInfo(userId)
              }, [])


  return (
    <div className="container py-5"> 
      <div className="row justify-content-center">

        <div className="col-md-8">
       
          <div className="card shadow-lg border-0 rounded-4">
         
            <div className="card-body p-5">

            <div className="text-end mb-3">
              <Link to="/postulaciones" className="btn btn-success">
                Mis postulaciones
              </Link>
            </div>

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

              <form>
                <h3 className="pb-3">Información Basica</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" value={apellido} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" value={mail} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" value={numero} readOnly />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button">
                    Editar
                  </button>
                </div>
              </form>
              <hr />

              <form>
                <h3 className="pb-3">Información Adicional</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Fecha Nacimiento</label>
                    <input type="text" className="form-control" value={fechaNacimiento}
                    onChange={(e) => {
                      setFechaNacimiento(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Lugar</label>
                    <input type="text" className="form-control" value={lugar}
                    onChange={(e) => {
                      setLugar(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Acerca</label>
                    <textarea type="text" className="form-control" value={acerca}
                    onChange={(e) => {
                      setAcerca(e.target.value)
                    }}
                    />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button"
                  onClick={handlePerfil}
                  >
                    Editar
                  </button>
                </div>
              </form>

              <hr />

              <form>
                <h3 className="pb-3">CV</h3>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Portafolio</label>
                    <textarea type="text" className="form-control" value={portafolio}
                    onChange={(e) => {
                      setPortafolio(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Experiencia</label>
                    <textarea type="text" className="form-control" value={experiencia}
                    onChange={(e) => {
                      setExperiencia(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Cursos</label>
                    <textarea type="text" className="form-control" value={cursos}
                    onChange={(e) => {
                      setCursos(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Capacitaciones</label>
                    <textarea type="text" className="form-control" value={capacitaciones}
                    onChange={(e) => {
                      setCapacitaciones(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Estudios</label>
                    <textarea type="text" className="form-control" value={estudios}
                    onChange={(e) => {
                      setEstudios(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Idiomas</label>
                    <textarea type="text" className="form-control" value={idiomas}
                    onChange={(e) => {
                      setIdiomas(e.target.value)
                    }}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Tecnologia</label>
                    <textarea type="text" className="form-control" value={tecnologia}
                    onChange={(e) => {
                      setTecnologia(e.target.value)
                    }}
                    />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button"
                  onClick={handleCV}
                  >
                    Editar
                  </button>
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
