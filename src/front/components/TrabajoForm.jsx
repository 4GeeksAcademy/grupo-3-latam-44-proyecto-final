import React, { useState } from "react";

const TrabajoForm = ({ trabajo, onUpdate }) => {
  const [formData, setFormData] = useState({
    modalidad: trabajo?.modalidad || "",
    nombre_puesto: trabajo?.nombre_puesto || "",
    remuneracion: trabajo?.remuneracion || "",
    condiciones: trabajo?.condiciones || "",
    responsabilidades: trabajo?.responsabilidades || "",
    requerimientos: trabajo?.requerimientos || "",
    activo: trabajo?.activo || true,
    fecha_inicio: trabajo?.fecha_inicio || "",
    fecha_vencimiento: trabajo?.fecha_vencimiento || ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`https://scaling-disco-q7qvv4w7rgv4cvw5-3001.app.github.dev/api/trabajos/${trabajo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          remuneracion: parseInt(formData.remuneracion),
        })
      });

      if (resp.ok) {
        const result = await resp.json();
        alert("✅ Trabajo actualizado con éxito");
        onUpdate(); // para recargar lista si lo necesitas
      } else {
        throw new Error("❌ Error al actualizar");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h3 className="mb-3 text-xl font-bold">Editar trabajo</h3>

      <input name="nombre_puesto" placeholder="Nombre del puesto" value={formData.nombre_puesto} onChange={handleChange} className="form-control mb-2" />
      <input name="modalidad" placeholder="Modalidad" value={formData.modalidad} onChange={handleChange} className="form-control mb-2" />
      <input name="remuneracion" placeholder="Remuneración" value={formData.remuneracion} onChange={handleChange} className="form-control mb-2" />
      <input name="condiciones" placeholder="Condiciones" value={formData.condiciones} onChange={handleChange} className="form-control mb-2" />
      <input name="responsabilidades" placeholder="Responsabilidades" value={formData.responsabilidades} onChange={handleChange} className="form-control mb-2" />
      <input name="requerimientos" placeholder="Requerimientos" value={formData.requerimientos} onChange={handleChange} className="form-control mb-2" />

      <label className="form-check-label">
        <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} className="form-check-input me-2" />
        ¿Activo?
      </label>

      <label className="form-label mt-3">Fecha y hora de inicio</label>
      <input
        type="datetime-local"
        name="fecha_inicio"
        value={formData.fecha_inicio}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <label className="form-label">Fecha y hora de vencimiento</label>
      <input
        type="datetime-local"
        name="fecha_vencimiento"
        value={formData.fecha_vencimiento}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <button type="submit" className="btn btn-success w-100">
        Guardar Cambios
      </button>
    </form>
  );
};

export default TrabajoForm;
