import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

const UserProfile = (id) => {

  const [mail, setMail] = useState()
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [numero, setNumero] = useState()
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
      
          useEffect(() => {
            handleUserInfo(userId)
              }, [])


  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=68"
                  alt="avatar"
                  className="rounded-circle shadow"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h3 className="mt-3 fw-bold">{nombre} {apellido}</h3>
              </div>

              <hr />

              <form>
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
                    Editar perfil
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
