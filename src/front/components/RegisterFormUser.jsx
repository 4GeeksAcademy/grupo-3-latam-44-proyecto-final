import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';



const RegisterFormUser = () => {


  const navigate = useNavigate()

  //Variable User Trabajador&Emrpesa

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [reEnteredpassword, setReEnteredPassword] = useState("")
  const [numero, setNumero] = useState("")

  //Variables User Trabajador

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")


  //Variables User Emrpesa

  const [nombreRp, setNombreRP] = useState("")
  const [apellidoRp, setApellidoRP] = useState("")
  const [nombreEmpresa, setNombreEmpresa] = useState("")
  const [razonSocial, setRazonSocial] = useState("")
  //Variables errores y cambio de perfil

  const [error, setError] = useState("")
  const [toggle, setToggle] = useState({ display: 'none' })
  const [toggleUser, setToggleUSer] = useState({ display: 'block' })
  const [estado, setEstado] = useState("")
  const [showInvalidPass, setShowInvalidPass] = useState({ display: 'none' })


  const toggleEmpresa = () => {

    if (estado === "") {
      setToggle({ display: 'block' });
      setToggleUSer({ display: 'none' });
      setEstado("active")
    } else {
      setToggle({ display: 'none' });
      setToggleUSer({ display: 'block' });
      setEstado("")
    }
  }



  //Endpoint User
  const handleSignup = async () => {
    const data = {
      "email": email,
      "password": password,
      "nombre": nombre,
      "apellido": apellido,
      "numero": numero
    };
    if (password === reEnteredpassword && password != "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataa = await response.json()
        setError(dataa.error)

        if (!response.ok) {
          throw new Error("Error login endpoint");

        }

        navigate("/")

      } catch (error) {


        console.error(error)
      }
    } else {
      setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
    }
  }

  //Endpoint Empresa
  const handleSignupEmpresa = async () => {
    const data = {
      "email": email,
      "password": password,
      "nombre_rp": nombreRp,
      "apellido_rp": apellidoRp,
      "telefono": numero,
      "nombreEmpresa": nombreEmpresa,
      "razonSocial": razonSocial

    };
    if (password === reEnteredpassword && password != "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataa = await response.json()
        setError(dataa.error)

        if (!response.ok) {
          throw new Error("Error login endpoint");

        }

        navigate("/")

      } catch (error) {


        console.error(error)
      }
    } else {
      setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
    }
  }


  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      animation: "fadeIn 1s ease-in-out"
    }}>
      <div className="card p-5 pb-4 shadow-lg border-0" style={{
        maxWidth: "420px",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "white",
        animation: "slideIn 0.8s ease forwards"
      }}>
        
        <h2 className="text-center mb-4 fw-bold" style={toggleUser}>Crear cuenta</h2>
        <h2 className="text-center mb-4 fw-bold" style={toggle}>Crear Empresa</h2>
        <form>
          <div className="form-floating mb-3" style={toggleUser}>
            <input type="text" className="form-control" id="nombre" placeholder="Nombre"
            onChange={(e) => {
              setNombre(e.target.value)
            }}
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="nombreEmpresa" placeholder="Nombre Empresa"
            onChange={(e) => {
              setNombreEmpresa(e.target.value)
            }}
            />
            <label htmlFor="nombreEmpresa">Nombre Empresa</label>
          </div>
          <div className="form-floating mb-3" style={toggle}>
            <input type="text" className="form-control" id="nombreRp" placeholder="Nombre Representante"
            onChange={(e) => {
              setNombreRP(e.target.value)
            }}
            />
            <label htmlFor="nombrerp">Nombre Representante</label>
          </div>
          <div className="form-floating mb-3"style={toggle}>
            <input type="text" className="form-control" id="apellidoRp" placeholder="Apellido Representante"
            onChange={(e) => {
              setApellidoRP(e.target.value)
            }}
            />
            <label htmlFor="apellidorp">Apellido Representante</label>
          </div>
          <div className="form-floating mb-3"style={toggleUser}>
            <input type="text" className="form-control" id="apellido" placeholder="Apellido"
            onChange={(e) => {
              setApellido(e.target.value)
            }}
            />
            <label htmlFor="apellido">Apellido</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="telefono" placeholder="Telefono"
            onChange={(e) => {
              setNumero(e.target.value)
            }}
            />
            <label htmlFor="telefono">Telefono</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" placeholder="Correo electrónico"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" placeholder="Contraseña"
            onChange={(e) => {
              setPassword(md5(e.target.value))
            }}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar contraseña"
            onChange={(e) => {
              setReEnteredPassword(md5(e.target.value))
            }}
            />
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
          </div>
          <div style={showInvalidPass} className="alert" >
            Passwords don't match
          </div>
          <button type="button" className="btn btn-primary w-100 py-2 fw-bold" style={toggleUser} onClick={handleSignup}>
            Registrarse
          </button>
          <button type="button" className="btn btn-primary w-100 py-2 fw-bold" style={toggle} onClick={handleSignupEmpresa}>
            Registrar Empresa
          </button>
        </form>
        <div className="pt-3 form-check form-switch d-flex justify-content-end gap-3">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa} />
          <label className="form-check-label" for="switchCheckChecked">Soy Empresa</label>
        </div>
      </div>

      {/* Animaciones simples en CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterFormUser;