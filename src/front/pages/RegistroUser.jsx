import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';

export const RegistroUser = () => {


	const navigate = useNavigate()

	//Variable User Trabajador&Emrpesa

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [reEnteredpassword, setReEnteredPassword] = useState("")
	const [numero, setNumero] = useState("")

	//Variables User Trabajador

	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
	

	//Variables User Emrpesa

	const [nombreRp, setNombreRP] = useState("")
	const [apellidoRp, setApellidoRP] = useState("")
	const [nombreEmpresa, setNombreEmpresa] = useState("")

	//Variables errores y cambio de perfil

	const [error, setError] = useState("")
	const [toggle, setToggle] = useState({ display: 'none' })
	const [toggleUser, setToggleUSer] = useState({ display: 'block' })
	const [estado, setEstado] = useState("")
	const [showInvalidPass, setShowInvalidPass] = useState({ display: 'none' })


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
	

	
//Endpoint User
	const handleSignup = async () => {
		const data = {
			"email": email,
			"password": password,
			"nombre": nombre,
			"apellido": apellido,
			"numero": numero
		};
		if (password === reEnteredpassword && password != "") {
			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				});

				const dataa = await response.json()
				setError(dataa.error)

				if (!response.ok) {
					throw new Error("Error login endpoint");

				}

				navigate("/")

			} catch (error) {


				console.error(error)
			}
		} else {
			setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
		}
	}

	//Endpoint Empresa
	const handleSignupEmpresa = async () => {
		const data = {
			"email": email,
			"password": password,
			"nombre_rp": nombreRp,
			"apellido_rp": apellidoRp,
			"telefono": numero,
			"nombreEmpresa":nombreEmpresa

		};
		if (password === reEnteredpassword && password != "") {
			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/empresa`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				});

				const dataa = await response.json()
				setError(dataa.error)

				if (!response.ok) {
					throw new Error("Error login endpoint");

				}

				navigate("/")

			} catch (error) {


				console.error(error)
			}
		} else {
			setShowInvalidPass({ display: 'block', color: 'red', paddingTop: '5px' });
		}
	}

	return (
		<div>
			<div className="form-check form-switch">
				<input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" onClick={toggleEmpresa}/>
				<label className="form-check-label" for="switchCheckChecked">Soy Empresa</label>
			</div>
			<form className="row g-3">
				<div className="col-md-6">
					<label for="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
					/>
				</div>
				<div className="col-md-6">
					<label for="inputPassword4" className="form-label">Contraseña</label>
					<input type="password" className="form-control" id="inputPassword4"
						onChange={(e) => {
							setPassword(md5(e.target.value))
						}}
					/>
				</div>
				<div className="col-md-6">
					<label for="inputPassword4" className="form-label">Reingresa Contraseña</label>
					<input type="password" className="form-control" id="inputPassword4"
						onChange={(e) => {
							setReEnteredPassword(md5(e.target.value))
						}}
					/>
					<div style={showInvalidPass} className="alert" >
						Passwords don't match
					</div>
				</div>
				<div className="col-12" style={toggleUser}>
					<label for="inputNombre" className="form-label">Nombre</label>
					<input type="text" className="form-control" id="inputNombre" placeholder="Nombre"
						onChange={(e) => {
							setNombre(e.target.value)
						}}
					/>
				</div>
				<div className="col-12" style={toggle}>
					<label for="inputNombre" className="form-label">Nombre Representante</label>
					<input type="text" className="form-control" id="inputNombre" placeholder="Nombre"
						onChange={(e) => {
							setNombreRP(e.target.value)
						}}
					/>
				</div>
				<div className="col-12" style={toggleUser}>
					<label for="inputApellido" className="form-label">Apellido</label>
					<input type="text" className="form-control" id="inputApellido" placeholder="Apellido"
						onChange={(e) => {
							setApellido(e.target.value)
						}}
					/>
				</div>
				<div className="col-12" style={toggle}>
					<label for="inputApellido" className="form-label">Apellido Representante</label>
					<input type="text" className="form-control" id="inputApellido" placeholder="Apellido"
						onChange={(e) => {
							setApellidoRP(e.target.value)
						}}
					/>
				</div>
				<div className="col-md-6">
					<label for="inputCity" className="form-label">Telefono</label>
					<input type="text" className="form-control" id="inputTelefono"
						onChange={(e) => {
							setNumero(e.target.value)
						}}
					/>
				</div>
				<div className="col-md-6" style={toggle}>
					<label for="inputCity" className="form-label">Nombre Empresa</label>
					<input type="text" className="form-control" id="inputTelefono"
						onChange={(e) => {
							setNombreEmpresa(e.target.value)
						}}
					/>
				</div>
				<div className="col-12" style={toggleUser}>
					<button type="button" onClick={handleSignup} className="btn btn-primary">Registrarme</button>
				</div>
				<div className="col-12" style={toggle}>
					<button type="button" onClick={handleSignupEmpresa} className="btn btn-primary">Registrar Empresa</button>
				</div>
			</form>
		</div>
	)
}
