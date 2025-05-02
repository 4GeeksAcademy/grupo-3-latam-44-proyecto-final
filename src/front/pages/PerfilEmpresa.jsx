// src/front/pages/PerfilEmpresa.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PerfilEmpresa = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [creditos, setCreditos] = useState(0);
  const [vigencia, setVigencia] = useState({ inicio: null, fin: null });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (!token || !userId) return navigate("/login");

    const getEmpresa = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          setEmpresa(data);
          setFormData(data);
          setCreditos(data.creditos || 0); // 👈 si viene en backend
          setVigencia({
            inicio: data.vigencia_inicio || "N/A",
            fin: data.vigencia_fin || "N/A"
          });
        } else {
          throw new Error("Error al obtener empresa");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getEmpresa();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (!formData.nombre_comercial || !formData.razon_social) {
      alert("Nombre comercial y razón social no pueden ir vacíos.");
      return;
    }

    if (formData.sitio_web && !formData.sitio_web.startsWith("https://")) {
      alert("El sitio web debe comenzar con https://");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("✅ Perfil actualizado correctamente.");
        setEmpresa(formData);
      } else {
        alert(result.msg || "Error al actualizar");
      }
    } catch (err) {
      console.error("Error al guardar", err);
    }
  };

  if (!empresa) return <p className="text-center mt-5">Cargando perfil...</p>;

  const camposPermitidos = {
    nombre_comercial: "Nombre Comercial",
    razon_social: "Razón Social",
    descripcion: "Descripción",
    ubicacion: "Dirección",
    sitio_web: "Sitio Web",
    correo: "Correo",
    telefono: "Teléfono",
    rfc: "RFC"
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Perfil de Empresa</h2>

      {/* Créditos y vigencia */}
      <div className="mb-4">
        <p className="fs-5 fw-bold text-success">
          Crédito para ver postulantes: {creditos}
        </p>
        <p className="text-muted">
          Vigencia del paquete: {vigencia.inicio} al {vigencia.fin}
        </p>
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="row">
        {Object.entries(camposPermitidos).map(([key, label]) => (
          <div className="col-md-6 mb-3" key={key}>
            <label className="form-label">{label}</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              className="form-control"
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="btn btn-primary mt-3">
        Guardar cambios
      </button>
    </div>
  );
};

export default PerfilEmpresa;
