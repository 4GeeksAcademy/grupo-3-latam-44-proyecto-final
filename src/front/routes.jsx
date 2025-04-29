
// src/front/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Vacantes } from "./pages/Vacantes"; // 👈 Agregamos estas rutas
import { Login } from "./pages/Login";
import { Registrarme } from "./pages/Registrarme";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarme" element={<Registrarme />} />
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
