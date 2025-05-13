import React, { useState, useEffect } from "react";

export const PostitBoard = () => {
    const mensajes = [
        "El primer paso te lleva más lejos que la intención.",
        "Cada CV es una oportunidad esperando ser descubierta.",
        "Hoy un sueño, mañana tu realidad laboral.",
        "La entrevista perfecta comienza con un clic.",
        "Postúlate, que el sí ya lo tienes a un paso.",
        "¿Quién dijo miedo? El futuro es tuyo.",
        "Construye tu propio destino profesional.",
        "Los grandes cambios comienzan buscando una vacante."
    ];

    const [activeMessages, setActiveMessages] = useState([]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < mensajes.length) {
                setActiveMessages((prev) => [...prev, mensajes[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="postit-board-container">
            {activeMessages.map((mensaje, idx) => (
                <div
                    key={idx}
                    className={`postit ${idx % 2 === 0 ? "left" : "right"}`}
                    style={{
                        transform: `rotate(${Math.random() * 10 - 5}deg)`
                    }}
                >
                    <div className="pin"></div>
                    <p>{mensaje}</p>
                </div>
            ))}
        </div>
    );
};

/* CSS (puedes meterlo en tu archivo global.css o PostitBoard.css)

@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.postit-board-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.postit {
  background-color: #fffc9e;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Permanent Marker', cursive;
  font-size: 1rem;
  padding: 10px;
  margin: 5px;
  animation: popin 0.5s ease;
}

.pin {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}

.left {
  align-self: flex-end;
}

.right {
  align-self: flex-start;
}

@keyframes popin {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
*/
