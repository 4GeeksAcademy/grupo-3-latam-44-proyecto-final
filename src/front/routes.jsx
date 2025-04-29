// src/front/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Vacantes } from "./pages/Vacantes"; 
import { Login } from "./pages/Login";
import { Registrarme } from "./pages/Registrarme";
import { AdminEmpresas } from "./pages/AdminEmpresas";
import { AdminTrabajadores } from "./pages/AdminTrabajadores"; 
import { AdminPagos } from "./pages/AdminPagos";
import { AdminReportes } from "./pages/AdminReportes";


// y en las rutas:
<Route path="/admin-pagos" element={<AdminPagos />} />




export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarme" element={<Registrarme />} />
          <Route path="/admin-empresas" element={<AdminEmpresas />} />
          <Route path="/admin-trabajadores" element={<AdminTrabajadores />} /> 
          <Route path="/admin-reportes" element={<AdminReportes />} />


        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
