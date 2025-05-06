import React, { useState } from "react";

const VacanteForm = ({ vacante = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre_puesto: vacante.nombre_puesto || "",
    modalidad: vacante.modalidad || "",
    remuneracion: vacante.remuneracion || "",
    moneda: vacante.moneda || "MXN",
    descripcion_puesto: vacante.descripcion_puesto || "",
    responsabilidades: vacante.responsabilidades || "",
    requerimientos: vacante.requerimientos || "",
    jornada: vacante.jornada || "",
    dias_laborales: vacante.dias_laborales || "",
    turnos: vacante.turnos || "",
    equipo_utilizado: vacante.equipo_utilizado || "",
    peligros: vacante.peligros || "",
    demandas_fisicas: vacante.demandas_fisicas || "",
    estado: vacante.estado || "Activa",
    fecha_publicacion: vacante.fecha_publicacion || "",
    fecha_vencimiento: vacante.fecha_vencimiento || "",
    activo: vacante.activo ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h4 className="mb-4">📝 Registrar o Editar Vacante</h4>

      <input name="nombre_puesto" placeholder="Nombre del puesto" value={formData.nombre_puesto} onChange={handleChange} className="form-control mb-2" />
      
      <select name="modalidad" value={formData.modalidad} onChange={handleChange} className="form-select mb-2">
        <option value="">Modalidad</option>
        <option value="Presencial">Presencial</option>
        <option value="Remoto">Remoto</option>
        <option value="Híbrido">Híbrido</option>
      </select>

      <div className="input-group mb-2">
        <span className="input-group-text">$</span>
        <input type="number" name="remuneracion" placeholder="Remuneración" value={formData.remuneracion} onChange={handleChange} className="form-control" />
        <select name="moneda" value={formData.moneda} onChange={handleChange} className="form-select">
          <option value="MXN">MXN</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <textarea name="descripcion_puesto" placeholder="Descripción del puesto" value={formData.descripcion_puesto} onChange={handleChange} className="form-control mb-2" rows={2} />

      <textarea name="responsabilidades" placeholder="Responsabilidades" value={formData.responsabilidades} onChange={handleChange} className="form-control mb-2" rows={2} />

      <textarea name="requerimientos" placeholder="Requerimientos" value={formData.requerimientos} onChange={handleChange} className="form-control mb-2" rows={2} />

      <input name="jornada" placeholder="Jornada laboral (ej. 48 horas)" value={formData.jornada} onChange={handleChange} className="form-control mb-2" />

      <input name="dias_laborales" placeholder="Días laborales (ej. Lunes a Domingo)" value={formData.dias_laborales} onChange={handleChange} className="form-control mb-2" />

      <input name="turnos" placeholder="Turnos (ej. Matutino/Vespertino)" value={formData.turnos} onChange={handleChange} className="form-control mb-2" />

      <input name="equipo_utilizado" placeholder="Equipo utilizado (ej. computadora, calculadora)" value={formData.equipo_utilizado} onChange={handleChange} className="form-control mb-2" />

      <textarea name="demandas_fisicas" placeholder="Demandas físicas" value={formData.demandas_fisicas} onChange={handleChange} className="form-control mb-2" rows={2} />

      <textarea name="peligros" placeholder="Peligros del puesto" value={formData.peligros} onChange={handleChange} className="form-control mb-2" rows={2} />

      <div className="row mb-2">
        <div className="col">
          <label className="form-label">📅 Fecha de publicación</label>
          <input type="date" name="fecha_publicacion" value={formData.fecha_publicacion} onChange={handleChange} className="form-control" />
        </div>
        <div className="col">
          <label className="form-label">📅 Fecha de vencimiento</label>
          <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange} className="form-select">
          <option value="Activa">Activa</option>
          <option value="Ocupada">Ocupada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      <div className="form-check mb-3">
        <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} className="form-check-input" />
        <label className="form-check-label ms-2">¿Vacante activa?</label>
      </div>

      <button type="submit" className="btn btn-success w-100">
        💾 Guardar Vacante
      </button>
    </form>
  );
};

export default VacanteForm;
