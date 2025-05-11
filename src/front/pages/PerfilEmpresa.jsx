import React from "react";
import {EmpresaProfile} from "../components/EmpresaProfile";

export const PerfilEmpresa = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <EmpresaProfile />
      </div>
    </div>
  );
};