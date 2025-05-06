// src/front/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout principal
import { Layout } from "./components/Layout";

// Páginas públicas
import { LandingPage } from "./pages/LandingPage";
import Login from "./pages/Login";
import { Vacantes } from "./pages/Vacantes";
import Registrarme from "./pages/Registrarme";


// Panel de administración
import { AdminEmpresas } from "./pages/AdminEmpresas";
import { AdminTrabajadores } from "./pages/AdminTrabajadores";
import { AdminPagos } from "./pages/AdminPagos";
import { AdminReportes } from "./pages/AdminReportes";
import { DashboardAdmin } from "./pages/DashboardAdmin";

// Vistas específicas
import { Vacante } from "./pages/Vacante";
import { PagosEmpresa } from "./pages/PagosEmpresa";
import { PostulacionesDetail } from "./pages/PostulacionesDetail";
import { VacantesEmpresa } from "./pages/VacantesEmpresa";
import { PerfilTrabajador } from "./pages/PerfilTrabajador"; // ✅ corregido
import { HistorialPagosEmpresa } from "./pages/HistorialPagosEmpresa";




import { PerfilTrabajador } from "./pages/PerfilTrabajador";
import PerfilUser from "./pages/PerfilUser";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/registrarme" element={<Registrarme />} />

          {/* Panel admin */}
          <Route path="/admin-empresas" element={<AdminEmpresas />} />
          <Route path="/admin-trabajadores" element={<AdminTrabajadores />} />
          <Route path="/admin-reportes" element={<AdminReportes />} />
          <Route path="/admin-pagos" element={<AdminPagos />} />
          <Route path="/admin" element={<DashboardAdmin />} />

          {/* Funcionalidad empresas */}
          <Route path="/empresa/vacantes" element={<VacantesEmpresa />} />
          <Route path="/empresa/pagos" element={<PagosEmpresa />} />
          <Route path="/empresa/historial" element={<HistorialPagosEmpresa />} />


          {/* Vistas específicas */}
          <Route path="/vacante/:id/postulaciones" element={<PostulacionesDetail />} />
          <Route path="/trabajador/:id" element={<PerfilTrabajador />} />
          <Route path="/perfil/user/:id" element={<PerfilUser/>}/>
        </Route>

        {/* Página de error 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
