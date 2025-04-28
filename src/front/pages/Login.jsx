import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoData, setInfoData] = useState();

  const [toggle, setToggle] = useState({ display: 'none' });
  const [toggleUser, setToggleUSer] = useState({ display: 'block' });
  const [estado, setEstado] = useState("");

  const navigate = useNavigate();

  const toggleEmpresa = () => {
    if (estado === "") {
      setToggle({ display: 'block' });
      setToggleUSer({ display: 'none' });
      setEstado("active");
    } else {
      setToggle({ display: 'none' });
      setToggleUSer({ display: 'block' });
      setEstado("");
    }
  };

  const handleLogin = async () => {
    const data = { email, password };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/user`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Error login endpoint");

      const response_data = await response.json();
      sessionStorage.setItem("access_token", response_data.access_token);
      setInfoData(response_data);
      navigate("/demo");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginEmpresa = async () => {
    const data = { email, password };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/empresa`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Error login empresa endpoint");

      const response_data = await response.json();
      sessionStorage.setItem("access_token", response_data.access_token);
      setInfoData(response_data);
      navigate("/demo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-sm mt-5">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa} />
        <label className="form-check-label" htmlFor="switchCheckChecked">Soy Empresa</label>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie más.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            onChange={(e) => setPassword(md5(e.target.value))}
          />
        </div>
        <div className="col-12" style={toggleUser}>
          <button type="button" onClick={handleLogin} className="btn btn-primary">Ingresar</button>
        </div>
        <div className="col-12" style={toggle}>
          <button type="button" onClick={handleLoginEmpresa} className="btn btn-primary">Ingresar Empresa</button>
        </div>
      </form>
    </div>
  );
};
