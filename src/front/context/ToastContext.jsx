import React, { createContext, useContext } from "react";
import { showToast } from "../utils/toastUtils"; // Asegúrate de que el path sea correcto

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// ✅ Ahora solo expone showToast desde el context, sin render manual
export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
