// src/front/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Vacantes } from "./pages/Vacantes"; // 👈 Agregamos estas rutas
import { Login } from "./pages/Login";
import { Registrarme } from "./pages/Registrarme";
import {Vacante} from "./pages/Vacante"
import { PerfilTrabajador } from "./pages/PerfilTrabajador";
import PerfilUser from "./pages/PerfilUser";
import { PerfilEmpresa } from "./pages/PerfilEmpresa";
import { CrearVacante } from "./pages/CrearVacante";
import { ListaDeVacantes } from "./pages/ListaDeVacantes";
import { EditarVacante } from "./pages/EditarVacante";
import { VacantePostulados } from "./pages/VacantePostulados";
import Postulaciones from "./pages/Postulaciones"; // Importa el componente

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/nueva-vacante" element={<CrearVacante />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarme" element={<Registrarme />} />
          <Route path="/vacante/:id" element={<Vacante />} />
          <Route path="/vacante/postulados" element={<VacantePostulados />} />
          <Route path="/vacante/editar/:id" element={<EditarVacante />} />
          <Route path="/perfil/user/:id" element={<PerfilUser />} />
          <Route path="/perfil/empresa/:id" element={<PerfilEmpresa />} />
          <Route path="/perfil/empresa/:id/listado-vacantes" element={<ListaDeVacantes />} />
          <Route path="/postulaciones" element={<Postulaciones />} /> {/* Nueva ruta */}
        </Route>

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
