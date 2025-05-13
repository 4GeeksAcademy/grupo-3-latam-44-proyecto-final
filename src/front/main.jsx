// src/front/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./routes"; // ✅ Correctamente llamando routes.jsx
import { StoreProvider } from "./hooks/useGlobalReducer";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  </React.StrictMode>
);
