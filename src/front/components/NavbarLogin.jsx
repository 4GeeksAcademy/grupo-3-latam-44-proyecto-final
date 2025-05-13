
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png"; // ✅ Importamos el logo
import useGlobalReducer from "../hooks/useGlobalReducer";

export const NavbarLogin = (toggle) => {

  const userId = sessionStorage.getItem('user_id')
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()


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



      dispatch({ type: "log_out" })


      navigate("/")

    } catch (error) {
      console.error(error)
    }
  }


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
        <Link to={`/perfil/user/${userId}`} className="btn btn-success">
          Mi Perfil
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  );
};
