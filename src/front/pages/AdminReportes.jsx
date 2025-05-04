// src/front/pages/AdminReportes.jsx
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export const AdminReportes = () => {
  const [pagos, setPagos] = useState([]);
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [total, setTotal] = useState(0);
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const [filtroPaquete, setFiltroPaquete] = useState("");
  const token = sessionStorage.getItem("token");

  const getPagos = async () => {
    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/pagos`;
      const params = new URLSearchParams();
      if (inicio) params.append("inicio", inicio);
      if (fin) params.append("fin", fin);
      if (filtroEmpresa) params.append("empresa", filtroEmpresa);
      if (filtroPaquete) params.append("paquete", filtroPaquete);
      if ([...params].length > 0) url += `?${params.toString()}`;

      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      setPagos(data);
      const suma = data.reduce((acc, p) => acc + (p.monto_pagado || 0), 0);
      setTotal(suma);
    } catch (error) {
      console.error("Error al cargar pagos:", error);
    }
  };

  useEffect(() => {
    getPagos();
  }, []);

  const exportarExcel = (datos) => {
    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Pagos");
    XLSX.writeFile(libro, "reporte_pagos.xlsx");
  };

  const exportarPDF = (datos) => {
    const doc = new jsPDF();
    doc.text("Reporte de Pagos", 14, 16);
    const tabla = datos.map((p) => [
      p.empresa_nombre,
      p.paquete,
      p.creditos,
      p.folio,
      p.fecha_compra,
      `$${p.monto_pagado?.toLocaleString() || "N/D"}`
    ]);
    doc.autoTable({
      head: [["Empresa", "Paquete", "Créditos", "Folio", "Fecha", "Monto"]],
      body: tabla,
      startY: 20,
    });
    doc.save("reporte_pagos.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Reportes Administrativos de Pagos</h2>

      {/* Filtros avanzados */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label>Fecha Inicio</label>
          <input
            type="date"
            className="form-control"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Fecha Fin</label>
          <input
            type="date"
            className="form-control"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Empresa</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre empresa"
            value={filtroEmpresa}
            onChange={(e) => setFiltroEmpresa(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label>Paquete</label>
          <select
            className="form-control"
            value={filtroPaquete}
            onChange={(e) => setFiltroPaquete(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Básico">Básico</option>
            <option value="Pro">Pro</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="col-md-1 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={getPagos}>
            🔍
          </button>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="table-responsive mb-4">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Empresa</th>
              <th>Paquete</th>
              <th>Créditos</th>
              <th>Folio</th>
              <th>Fecha Compra</th>
              <th>Monto Pagado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p, i) => (
              <tr key={i}>
                <td>{p.empresa_nombre}</td>
                <td>{p.paquete}</td>
                <td>{p.creditos}</td>
                <td>{p.folio}</td>
                <td>{p.fecha_compra}</td>
                <td>${p.monto_pagado ? p.monto_pagado.toLocaleString() : "N/D"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td colSpan="5" className="text-end fw-bold">Total Pagado:</td>
              <td className="fw-bold text-success">${total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        {/* Botones para exportar */}
        <div className="d-flex justify-content-end gap-3 mb-5">
          <button className="btn btn-success" onClick={() => exportarExcel(pagos)}>
            📗 Exportar a Excel
          </button>
          <button className="btn btn-danger" onClick={() => exportarPDF(pagos)}>
            📕 Exportar a PDF
          </button>
        </div>
      </div>

      {/* Gráfica de distribución */}
      <div className="mb-5">
        <h4 className="text-center mb-4">Distribución de Paquetes Vendidos</h4>
        <Pie
          data={{
            labels: ["Básico", "Pro", "Premium"],
            datasets: [
              {
                label: "Cantidad Vendida",
                data: [
                  pagos.filter((p) => p.paquete === "Básico").length,
                  pagos.filter((p) => p.paquete === "Pro").length,
                  pagos.filter((p) => p.paquete === "Premium").length,
                ],
                backgroundColor: ["#6c757d", "#0d6efd", "#198754"],
                borderColor: "#fff",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
