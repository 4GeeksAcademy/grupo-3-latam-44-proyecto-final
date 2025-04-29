// src/front/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes"; // ✅ Correctamente llamando routes.jsx

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
