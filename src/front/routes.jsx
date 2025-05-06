
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
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarme" element={<Registrarme />} />
          <Route path="/vacante/:id" element={<Vacante/>} />
          <Route path="/perfil/user/:id" element={<PerfilUser/>}/>
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
