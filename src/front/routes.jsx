// src/front/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout principal
import { Layout } from "./components/Layout";

// Páginas públicas
import { LandingPage } from "./pages/LandingPage";
import { Vacantes } from "./pages/Vacantes";
import { Registrarme } from "./pages/Registrarme";

// Panel de administración
import { AdminEmpresas } from "./pages/AdminEmpresas";
import { AdminTrabajadores } from "./pages/AdminTrabajadores";
import { AdminPagos } from "./pages/AdminPagos";
import { AdminReportes } from "./pages/AdminReportes";
import { DashboardAdmin } from "./pages/DashboardAdmin";

// Vistas específicas
import { Vacante } from "./pages/Vacante";
import { PagosEmpresa } from "./pages/PagosEmpresa";
import { PostulacionesDetail } from "./pages/PostulacionesDetail"; // ✅ Import actualizado
import { VacantesEmpresa } from "./pages/VacantesEmpresa";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/registrarme" element={<Registrarme />} />

          {/* Panel admin */}
          <Route path="/admin-empresas" element={<AdminEmpresas />} />
          <Route path="/admin-trabajadores" element={<AdminTrabajadores />} />
          <Route path="/admin-reportes" element={<AdminReportes />} />
          <Route path="/admin-pagos" element={<AdminPagos />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/empresa/vacantes" element={<VacantesEmpresa />} />
          {/* Funcionalidad empresas */}
          <Route path="/empresa/pagos" element={<PagosEmpresa />} />

          {/* Vista de una vacante y sus postulaciones */}
          <Route path="/vacante/:id/postulaciones" element={<PostulacionesDetail />} />
        </Route>

        {/* Página de error 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
