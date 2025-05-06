// src/front/pages/HistorialPagosEmpresa.jsx
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const HistorialPagosEmpresa = () => {
    const [pagos, setPagos] = useState([]);
    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");
    const token = sessionStorage.getItem("token");

    const getHistorial = async () => {
        try {
            let url = `${import.meta.env.VITE_BACKEND_URL}/api/empresa/mis-pagos`;
            if (inicio || fin) {
                const params = new URLSearchParams();
                if (inicio) params.append("inicio", inicio);
                if (fin) params.append("fin", fin);
                url += `?${params.toString()}`;
            }

            const resp = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await resp.json();
            setPagos(data);
        } catch (error) {
            console.error("Error al obtener historial:", error);
        }
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Historial de Pagos", 14, 16);
        const tabla = pagos.map((p) => [
            p.paquete,
            p.fecha_compra,
            p.monto_pagado,
            p.creditos,
            p.folio
        ]);
        doc.autoTable({
            head: [["Paquete", "Fecha", "Monto", "Créditos", "Folio"]],
            body: tabla,
            startY: 20,
        });
        doc.save("historial_pagos.pdf");
    };

    useEffect(() => {
        getHistorial();
    }, []);

    return (
        <div className="mt-5">
            <h4 className="mb-4">📋 Historial de Pagos</h4>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label>Desde:</label>
                    <input type="date" className="form-control" value={inicio} onChange={(e) => setInicio(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label>Hasta:</label>
                    <input type="date" className="form-control" value={fin} onChange={(e) => setFin(e.target.value)} />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={getHistorial}>
                        🔍 Filtrar
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Paquete</th>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Créditos</th>
                            <th>Folio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((p, i) => (
                            <tr key={i}>
                                <td>{p.paquete}</td>
                                <td>{p.fecha_compra}</td>
                                <td>${p.monto_pagado}</td>
                                <td>{p.creditos}</td>
                                <td>{p.folio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-danger" onClick={exportarPDF}>
                    📥 Descargar PDF
                </button>
            </div>
        </div>
    );
};
