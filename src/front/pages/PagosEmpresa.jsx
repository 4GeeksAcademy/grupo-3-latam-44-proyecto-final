import React, { useState } from "react";

const paquetes = [
  {
    nombre: "Paquete Básico",
    precio: 500,
    vacantes: 1,
    creditos: 2,
    duracion: 60,
  },
  {
    nombre: "Paquete Pro",
    precio: 1200,
    vacantes: 3,
    creditos: 6,
    duracion: 60,
  },
  {
    nombre: "Paquete Premium",
    precio: 3000,
    vacantes: "Ilimitadas",
    creditos: "Ilimitados",
    duracion: 60,
  },
];

let numeroNota = 1;

export const PagosEmpresa = () => {
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  const [solicitaFactura, setSolicitaFactura] = useState(false);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);

  const hoy = new Date();
  const fechaInicio = hoy.toLocaleDateString();
  const fechaFin = new Date(hoy.setDate(hoy.getDate() + (paqueteSeleccionado?.duracion || 0))).toLocaleDateString();

  const subtotal = paqueteSeleccionado?.precio || 0;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const totalEnLetras = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(total);

  const generarFolioUnico = () => {
    const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789@$#";
    return Array(10).fill().map(() => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join("");
  };

  const handleConfirmarPago = () => {
    setPagoConfirmado(true);
    numeroNota++;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧾 Compra de Servicios para Empresas</h2>

      <div className="row">
        {paquetes.map((paq, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className={`card shadow ${paq.nombre === paqueteSeleccionado?.nombre ? "border-primary" : ""}`}
              onClick={() => {
                setPaqueteSeleccionado(paq);
                setPagoConfirmado(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{paq.nombre}</h5>
                <p className="card-text">
                  Duración: {paq.duracion} días<br />
                  Publicaciones: {paq.vacantes}<br />
                  Crédito para ver postulantes = {paq.creditos}<br />
                  Precio: ${paq.precio.toLocaleString()} MXN
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paqueteSeleccionado && (
        <div className="mt-5">
          <h4 className="mb-3">Resumen de tu compra</h4>
          <table className="table table-bordered">
            <tbody>
              <tr><th>Nombre Comercial</th><td>Empresa Demo S.A. de C.V.</td></tr>
              <tr><th>Paquete</th><td>{paqueteSeleccionado.nombre}</td></tr>
              <tr><th>Cantidad</th><td>1</td></tr>
              <tr><th>Precio Unitario</th><td>${paqueteSeleccionado.precio.toLocaleString()}</td></tr>
              <tr><th>Subtotal</th><td>${subtotal.toLocaleString()}</td></tr>
              <tr><th>IVA (16%)</th><td>${iva.toFixed(2)}</td></tr>
              <tr><th>Total</th><td><strong>${total.toLocaleString()} ({totalEnLetras})</strong></td></tr>
              <tr><th>Vigencia</th><td>{fechaInicio} al {fechaFin}</td></tr>
              <tr><th>Número de Nota</th><td>{numeroNota}</td></tr>
              <tr><th>Folio para Factura</th><td>{generarFolioUnico()}</td></tr>
              <tr><th>Equivalente</th><td>1 vacante = 1 crédito</td></tr>
            </tbody>
          </table>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="facturaCheck"
              checked={solicitaFactura}
              onChange={() => setSolicitaFactura(!solicitaFactura)}
            />
            <label className="form-check-label" htmlFor="facturaCheck">
              Solicito factura
            </label>
          </div>

          {solicitaFactura && (
            <div className="alert alert-info">
              Puedes generar tu factura en: <strong>https://facturacion.jobfinder.com</strong><br />
              usando el Folio para Factura mostrado arriba.
            </div>
          )}

          <button className="btn btn-success w-100" onClick={handleConfirmarPago}>
            Confirmar Pago (modo demo)
          </button>

          <p className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
            Al hacer clic en “Confirmar Pago”, aceptas que se descontará un crédito por cada postulante al que accedas desde este momento. Si deseas facturar, debes marcar la opción antes de pagar.
          </p>
        </div>
      )}

      {pagoConfirmado && (
        <div className="alert alert-success mt-4 text-center">
          ✅ ¡Pago registrado con éxito! Tus créditos están disponibles y el paquete está activo.
        </div>
      )}
    </div>
  );
};
