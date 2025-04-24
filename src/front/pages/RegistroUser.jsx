import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import md5 from 'md5';

export const RegistroUser = () => {
    const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [reEnteredpassword, setReEnteredPassword] = useState("")
	const [nombre, setNombre] = useState("")
	const [apellido, setApellido] = useState("")
	const [numero, setNumero] = useState("")
	const [error, setError] = useState("")
	const [showInvalidPass, setShowInvalidPass] = useState({ display: 'none' })

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

    return (
        <div>
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
                    <label for="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4"
                    onChange={(e) => {
						setPassword(md5(e.target.value))
					}}
                    />
                </div>
                <div className="col-md-6">
                    <label for="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4"
                    onChange={(e) => {
						setReEnteredPassword(md5(e.target.value))
					}}
                    />
                    <div style={showInvalidPass} className="alert" >
						Passwords don't match
					</div>
                </div>
                <div className="col-12">
                    <label for="inputNombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputNombre" placeholder="Nombre"
                     onChange={(e) => {
						setNombre(e.target.value)
					}}
                    />
                </div>
                <div className="col-12">
                    <label for="inputApellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputApellido" placeholder="Apellido"
                     onChange={(e) => {
						setApellido(e.target.value)
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
                <div className="col-12">
                    <button type="button" onClick={handleSignup} className="btn btn-primary">Registrarme</button>
                </div>
            </form>
        </div>
    )
}
