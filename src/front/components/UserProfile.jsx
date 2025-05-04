import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

const UserProfile = (id) => {

  const [mail, setMail] = useState()
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [numero, setNumero] = useState()
  const [fechaNacimiento, setFechaNacimiento] = useState()
  const [lugar, setLugar] = useState()
  const [acerca, setAcerca] = useState()
  const  userId  = sessionStorage.getItem('user_id')

  
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


      
          useEffect(() => {
            handleUserInfo(userId)
            handlePerfilInfo(userId)
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
                    <input type="text" className="form-control" value={fechaNacimiento} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Lugar</label>
                    <input type="text" className="form-control" value={lugar} readOnly />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Acerca</label>
                    <textarea type="text" className="form-control" value={acerca} readOnly />
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
                <h3 className="pb-3">Información </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Fecha Nacimiento</label>
                    <input type="text" className="form-control" value={fechaNacimiento} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Lugar</label>
                    <input type="text" className="form-control" value={lugar} readOnly />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Acerca</label>
                    <textarea type="text" className="form-control" value={acerca} readOnly />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button">
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
