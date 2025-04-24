import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';
import { NavbarLogin } from "../components/NavbarLogin";

export const Login = () => {

    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [infoData, setInfoData] = useState()

    //Cambio de perfil
    const [toggle, setToggle] = useState({ display: 'none' })
    const [toggleUser, setToggleUSer] = useState({ display: 'block' })
    const [estado, setEstado] = useState("")



	const toggleEmpresa = () =>{

		if(estado===""){
		setToggle({ display: 'block'});
		setToggleUSer({ display: 'none'});
		setEstado("active")
		}else{
			setToggle({ display: 'none'});
			setToggleUSer({ display: 'block'});
			setEstado("")
		}
	}

    const handleLogin = async () => {
		const data = {
			"email": email,
			"password": password
		};
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/user`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error("Error login endpoint");

			}

			const response_data = await response.json();

			sessionStorage.setItem("access_token", response_data.access_token)
			setInfoData(response_data)

			navigate("/demo")

		} catch (error) {
			console.error(error)
		}
	}


    const handleLoginEmpresa = async () => {
		const data = {
			"email": email,
			"password": password
		};
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login/empresa`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error("Error login endpoint");

			}

			const response_data = await response.json();

			sessionStorage.setItem("access_token", response_data.access_token)
			setInfoData(response_data)

			navigate("/demo")

		} catch (error) {
			console.error(error)
		}
	}

    return (
        <div>
            <NavbarLogin />
            <div className='container-sm'>
            <div className="form-check form-switch">
				<input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa}/>
				<label className="form-check-label" for="switchCheckChecked">Soy Empresa</label>
			</div>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={(e) => {
                        setPassword(md5(e.target.value))
                    }}
                    />
                </div>
                <div className="col-12" style={toggleUser}>
                <button type="button" onClick={handleLogin} className="btn btn-primary">Ingresar</button>
                </div>
                <div className="col-12" style={toggle}>
					<button type="button" onClick={handleLoginEmpresa} className="btn btn-primary">Registrar Empresa</button>
				</div>
            </form>
            </div>
        </div>
    )
}
