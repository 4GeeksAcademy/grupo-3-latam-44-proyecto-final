import React, { useState } from "react"

export const Login = () => {

    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [infoData, setInfoData] = useState()

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


    return (
        <div>
            <div className='container-sm'>
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
                <button type="button" onClick={handleLogin} className="btn btn-primary">Ingresar</button>
            </form>
            </div>
        </div>
    )
}
