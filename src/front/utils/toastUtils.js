import { toast } from "react-toastify";

// ✅ Notificación moderna con estilo cápsula y animación
export const showToast = (message, type = "default", callback = null) => {
  const styleBase = {
    maxWidth: "fit-content",
    fontSize: "15px",
    padding: "12px 18px",
    borderRadius: "9999px", // ✅ Estilo cápsula
    fontWeight: "500",
    color: "#fff",
    background: "#607D8B",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  };

  const config = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: "🔔",
    style: { ...styleBase },
  };

  const customByType = {
    success: { icon: "✅", background: "#4CAF50" },
    error: { icon: "❌", background: "#2196F3" },
    info: { icon: "ℹ️", background: "#2196F3" },
    warn: { icon: "⚠️", background: "#FFC107", color: "#000" },
    warning: { icon: "⚠️", background: "#FFC107", color: "#000" },
    save: { icon: "💾", background: "#9C27B0" },
    guardar: { icon: "💾", background: "#9C27B0" },
    dark: { icon: "🖤", background: "#212121" },
    pill: { icon: "🎉", background: "#e3fcec", color: "#22543d" }, // ✅ cápsula exitosa
    default: { icon: "🔔", background: "#607D8B" },
  };

  const selected = customByType[type] || customByType["default"];
  config.icon = selected.icon;
  config.style.background = selected.background;
  if (selected.color) config.style.color = selected.color;

  toast(message, config);

  if (typeof callback === "function") {
    setTimeout(callback, config.autoClose || 3000);
  }
};
