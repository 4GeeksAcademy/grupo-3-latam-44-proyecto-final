// src/front/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          {/* Logo y Descripción */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">TrabajoLatam</h5>
            <p>
              Conectamos talento con oportunidades en toda Latinoamérica. 
              Encuentra el trabajo de tus sueños con nosotros.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Enlaces</h5>
            <p><Link to="/" className="text-light text-decoration-none">Inicio</Link></p>
            <p><Link to="/buscar" className="text-light text-decoration-none">Buscar Trabajos</Link></p>
            <p><Link to="/registro" className="text-light text-decoration-none">Registrarse</Link></p>
            <p><Link to="/login" className="text-light text-decoration-none">Iniciar Sesión</Link></p>
          </div>

          {/* Contacto */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contacto</h5>
            <p><i className="fas fa-envelope me-3"></i> contacto@trabajolatam.com</p>
          </div>

          {/* Redes sociales */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Síguenos</h5>
            <a href="#" className="text-light me-4"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-light me-4"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-light me-4"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="text-light me-4"><i className="fab fa-instagram"></i></a>
          </div>

        </div>

        <hr className="my-3" />

        {/* Footer legal */}
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center">
              © {new Date().getFullYear()} TrabajoLatam - 
              <Link to="/privacidad" className="text-warning text-decoration-none ms-2">Política de Privacidad</Link> |
              <Link to="/terminos" className="text-warning text-decoration-none ms-2">Términos de Servicio</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
