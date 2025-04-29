// src/front/components/Layout.jsx
import React from "react";
import { NavbarHome } from "./NavbarHome"; // ✅ El tuyo oficial
import { Footer } from "./Footer"; // ✅ Usamos el que ya existe
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <NavbarHome />
      <main style={{ minHeight: "calc(100vh - 120px)" }}>
        {/* Ajuste para que no tape el Footer */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
