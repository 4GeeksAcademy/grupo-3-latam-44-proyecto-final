import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // ✅ ¡IMPORTANTE!
import { ToastContainer } from "react-toastify";
import { NavbarHome } from "./NavbarHome";
import { Footer } from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { NavbarLogin } from "./NavbarLogin";




export const Layout = () => {
  

  return (
    <>
      
      <main style={{ minHeight: "calc(100vh - 120px)" }}>
        <Outlet />
      </main>
      <Footer />

      {/* ✅ Este es el ToastContainer universal */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        style={{
          top: "65%",
          right: "40px",
          maxWidth: "fit-content",
          zIndex: 9999
        }}
      />

      {/* ✅ Animación para los toasts */}
      <style>{`
        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
