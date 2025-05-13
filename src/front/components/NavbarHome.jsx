// src/front/pages/NavbarHome.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png"; // ✅ Importamos el logo

export const NavbarHome = () => {
  const navigate = useNavigate()
 
  const [toggleUser, setToggleUSer] = useState({ display: 'block' })

  const  userId  = sessionStorage.getItem('user_id')



  const toggleEmpresa = (userId) =>{

  
    if(userId===null){
    setToggleUSer({ display: 'none'});
    }else if(userId!=null){
      setToggleUSer({ display: 'block'});

    }
  }

  const handleLogout = async () => {

    try {
      const response = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
        }
      });
      if (!response.ok) {
        throw new Error("Error logout endpoint");

      }

      const responseData = await response.json();

      console.log(responseData)

      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('user_id')


      navigate("/")

    } catch (error) {
      console.error(error)
    }
  }

   useEffect(() => {
              toggleEmpresa(userId)
                },[])

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#ffffff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo y nombre */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="JobFinder"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "20px", color: "#333" }}>
          JobFinder
        </span>
      </div>

      {/* Botones de navegación */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
        <Link to="/vacantes" className="btn btn-primary">
          Vacantes
        </Link>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/registrarme" className="btn btn-success">
          Registrarme
        </Link>
        <button onClick={handleLogout} className="btn btn-danger" style={toggleUser}>
          Logout
        </button>
      </div>
    </nav>
  );
};
