// src/front/pages/NavbarHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"; // ✅ Importamos el logo

export const NavbarHome = () => {
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
          src={logo} // ✅ Aquí ya usamos el import
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
      </div>
    </nav>
  );
};
