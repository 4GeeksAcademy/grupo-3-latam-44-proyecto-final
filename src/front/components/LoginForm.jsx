import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';

const LoginFormUser = () => {

  const navigate = useNavigate()

   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
      const [infoData, setInfoData] = useState()
  
      //Cambio de perfil
      const [toggle, setToggle] = useState({ display: 'none' })
      const [toggleUser, setToggleUSer] = useState({ display: 'block' })
      const [estado, setEstado] = useState("")
  
  
  
    const toggleEmpresa = () =>{
  
      if(estado===""){
      setToggle({ display: 'block'});
      setToggleUSer({ display: 'none'});
      setEstado("active")
      }else{
        setToggle({ display: 'none'});
        setToggleUSer({ display: 'block'});
        setEstado("")
      }
    }
  
      const handleLogin = async () => {
      const data = {
        "email": email,
        "password": password
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/user`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error("Error login endpoint");
  
        }
  
        const response_data = await response.json();
  
        sessionStorage.setItem("access_token", response_data.access_token)
        sessionStorage.setItem("user_id", response_data.user_id)
        setInfoData(response_data)
  
        navigate(`/perfil/user/${response_data.user_id}`)
  
      } catch (error) {
        console.error(error)
      }
    }
  
  
      const handleLoginEmpresa = async () => {
      const data = {
        "email": email,
        "password": password
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/empresa`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error("Error login endpoint");
  
        }
  
        const response_data = await response.json();
  
        sessionStorage.setItem("access_token", response_data.access_token)
        setInfoData(response_data)
  
        navigate("/")
  
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      animation: "fadeIn 1s ease-in-out"
    }}>
      <div className="card p-5 pb-4 shadow-lg border-0" style={{
        maxWidth: "400px",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "white",
        animation: "slideIn 0.8s ease forwards"
      }}>
        <h2 className="text-center mb-4 fw-bold" style={toggleUser}>Iniciar sesión</h2>
        <h2 className="text-center mb-4 fw-bold" style={toggle}>Iniciar sesión Como Empresa</h2>
        <form>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="loginEmail" placeholder="Correo electrónico"
            onChange={(e) => {
              setEmail(e.target.value)
          }}
            />
            <label htmlFor="loginEmail">Correo electrónico</label>
          </div>
          <div className="form-floating mb-4">
            <input type="password" className="form-control" id="loginPassword" placeholder="Contraseña"
            onChange={(e) => {
              setPassword(md5(e.target.value))
          }}
            />
            <label htmlFor="loginPassword">Contraseña</label>
          </div>
          <button type="button" className="btn btn-success w-100 py-2 fw-bold" style={toggleUser} onClick={handleLogin}>
            Entrar
          </button>
          <button type="button" className="btn btn-success w-100 py-2 fw-bold" style={toggle} onClick={handleLoginEmpresa}>
            Entrar como Empresa
          </button>
        </form>
        <div className="pt-3 form-check form-switch d-flex justify-content-end gap-3">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa} />
          <label className="form-check-label" for="switchCheckChecked">Soy Empresa</label>
        </div>
      </div>

      {/* Animaciones CSS */}
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

export default LoginFormUser;
