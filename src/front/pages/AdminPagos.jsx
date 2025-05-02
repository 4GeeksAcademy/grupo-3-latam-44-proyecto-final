// src/front/pages/AdminPagos.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const AdminPagos = () => {
  const pagos = [
    { id: 1, empresa: "Tech Solutions", monto: 1500, fecha: "2024-06-01" },
    { id: 2, empresa: "Marketing Creativo", monto: 800, fecha: "2024-06-03" },
    { id: 3, empresa: "Ingeniería Global", monto: 1200, fecha: "2024-06-04" },
    { id: 4, empresa: "Empresa XYZ", monto: 600, fecha: "2024-06-06" },
  ];

  const data = {
    labels: pagos.map((pago) => pago.empresa),
    datasets: [
      {
        label: "Ingresos $MXN",
        data: pagos.map((pago) => pago.monto),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard de Pagos</h2>

      {/* Tabla de pagos */}
      <div className="table-responsive mb-5">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Empresa</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.id}</td>
                <td>{pago.empresa}</td>
                <td>${pago.monto.toLocaleString()}</td>
                <td>{pago.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfica de barras */}
      <div className="mb-5">
        <h4 className="text-center mb-4">Ingresos por Empresa</h4>
        <Bar data={data} />
      </div>
    </div>
  );
};
