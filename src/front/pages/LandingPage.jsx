// src/front/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Post-its ÚNICOS y MOTIVADORES
const postItsData = [
  { id: "a1", text: "Convierte tu talento en éxito", color: "#FFEB3B" },
  { id: "b2", text: "La oportunidad que esperabas está aquí", color: "#FFCDD2" },
  { id: "c3", text: "Construye tu futuro hoy", color: "#C8E6C9" },
  { id: "d4", text: "Despierta el líder que llevas dentro", color: "#BBDEFB" },
  { id: "e5", text: "Haz lo que amas, trabaja feliz", color: "#FFF9C4" },
  { id: "f6", text: "Tu próximo empleo te está buscando", color: "#F8BBD0" },
  { id: "g7", text: "Cambia tu historia profesional", color: "#DCEDC8" },
  { id: "h8", text: "Deja huella con tu talento", color: "#B3E5FC" },
  { id: "i9", text: "¡El éxito comienza con un clic!", color: "#FFE0B2" },
];

export const LandingPage = () => {
  const [visiblePostIts, setVisiblePostIts] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < postItsData.length) {
        setVisiblePostIts((prev) => [...prev, postItsData[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getInitialPosition = (index) => {
    if (index % 2 === 0) {
      return { x: -200, y: -300 };
    } else {
      return { x: 200, y: -300 };
    }
  };

  return (
    <>
      {/* HERO principal */}
      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/img/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Texto central */}
        <div
          className="text-center p-5"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "15px",
            maxWidth: "700px",
          }}
        >
          <h1 className="text-white mb-4">
            ¿Buscas tu primer empleo o un cambio de carrera?
          </h1>
          <p className="text-white">
            Miles de vacantes te están buscando... ¿y tú qué esperas?
          </p>
        </div>

        {/* Contenedor de Post-its */}
        <div
          className="postits-container"
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
            padding: "0 20px",
          }}
        >
          {visiblePostIts.map((postIt, idx) => (
            postIt ? (
              <motion.div
                key={postIt.id} // ✅ ahora todos tienen ID único
                initial={{
                  opacity: 0,
                  ...getInitialPosition(idx),
                  rotate: Math.random() * 10 - 5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: Math.random() * 10 - 5,
                }}
                transition={{ duration: 1 }}
                style={{
                  backgroundColor: postIt.color,
                  padding: "15px",
                  borderRadius: "10px",
                  width: "150px",
                  minHeight: "100px",
                  boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
                  fontFamily: "'Permanent Marker', cursive",
                  fontSize: "16px",
                  textAlign: "center",
                  flex: "0 0 auto",
                }}
              >
                {postIt.text}
              </motion.div>
            ) : null
          ))}
        </div>
      </div>

      {/* Estilos RESPONSIVOS */}
      <style>
        {`
          @media (max-width: 768px) {
            .hero-section {
              background-size: contain !important;
              background-repeat: no-repeat !important;
              background-position: center top !important;
              height: auto !important;
              min-height: 80vh;
              padding-top: 50px;
              padding-bottom: 20px;
            }
            .postits-container {
              display: grid !important;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              justify-content: center;
              align-items: center;
            }
            .postits-container div {
              width: 100% !important;
              font-size: 14px !important;
              padding: 8px !important;
            }
          }

          @media (max-width: 480px) {
            .postits-container {
              grid-template-columns: repeat(2, 1fr);
            }
            .postits-container div {
              font-size: 12px !important;
            }
          }
        `}
      </style>
    </>
  );
};
