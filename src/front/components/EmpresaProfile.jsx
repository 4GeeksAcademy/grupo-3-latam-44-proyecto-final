import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

export const EmpresaProfile = (id) => {


    const userId = sessionStorage.getItem('user_id')

    //infor user

    const [nombre, setNombre] = useState()
    const [razonSocial, setRazonSocial] = useState()
    const [nombreRp, setNombreRp] = useState()
    const [apellidoRp, setApellidoRp] = useState()
    const [descripcion, setDescripcion] = useState()
    const [ubicacion, setUbicacion] = useState()
    const [sitioWeb, setsitioWeb] = useState()
    const [email, setEmail] = useState()
    const [telefono, setTelefono] = useState()
    const [rfc, setRfc] = useState()




    const handleEmpresaInfo = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/empresa/${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                }
            });

            const data = await response.json()
            setNombre(data.nombre)
            setRazonSocial(data.razon_social)
            setNombreRp(data.nombrerp)
            setApellidoRp(data.apellidorp)
            setDescripcion(data.descripcion)
            setUbicacion(data.ubicacion)
            setsitioWeb(data.sitio_web)
            setEmail(data.email)
            setTelefono(data.telefono)
            setRfc(data.rfc)




        } catch (error) {
            console.log(error)
        }
    }




    const handleEditarPerfil = async () => {
        const data = {

            "nombre": nombre,
            "razon_socia": razonSocial,
            "nombrerp": nombreRp,
            "apellidorp": apellidoRp,
            "descripcion": descripcion,
            "ubicacion": ubicacion,
            "sitio_web": sitioWeb,
            "email": email,
            "telefono": telefono,
            "rfc": rfc

        };
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/empresa/${userId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('access_token')}`
                },
                body: JSON.stringify(data)
            });

            const dataa = await response.json()
            setError(dataa.error)

            if (!response.ok) {
                throw new Error("Error endpoint");

            }
        } catch (error) {


            console.error(error)
        }
    }



    useEffect(() => {
        handleEmpresaInfo(userId)

    }, [])


    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="d-flex justify-content-end m-3">
                        <Link to={`/perfil/empresa/${userId}/listado-vacantes`}>
                                <button className="btn btn-outline-primary px-4 mx-2" type="button">
                                    Ver Vacantes
                                </button>
                            </Link>
                            <Link to="/nueva-vacante">
                                <button className="btn btn-outline-primary px-4" type="button">
                                    Crear Vacante
                                </button>
                            </Link>
                        </div>
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <img
                                    src="https://picsum.photos/150"
                                    alt="avatar"
                                    className="rounded-circle shadow"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                                <h3 className="mt-3 fw-bold">{nombre}</h3>
                                <h6 className="mt-3 fw-bold">Razon Social: {razonSocial}</h6>
                            </div>

                            <hr />

                            <form>
                                <h3 className="pb-3">Información Basica</h3>
                                <div className="row g-3 pb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre Representante</label>
                                        <input type="text" className="form-control" value={nombreRp} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Apellido</label>
                                        <input type="text" className="form-control" value={apellidoRp} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Correo</label>
                                        <input type="email" className="form-control" value={email} readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Teléfono</label>
                                        <input type="text" className="form-control" value={telefono} readOnly />
                                    </div>
                                </div>
                                <hr />
                                <h3 className="pb-3 pt-2">Información Adicional</h3>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Sitio Web</label>
                                        <input type="text" className="form-control" value={sitioWeb}
                                            onChange={(e) => {
                                                setsitioWeb(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Ubicacion</label>
                                        <input type="text" className="form-control" value={ubicacion}
                                            onChange={(e) => {
                                                setUbicacion(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">rfc</label>
                                        <input type="text" className="form-control" value={rfc}
                                            onChange={(e) => {
                                                setRfc(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Descripcion</label>
                                        <textarea type="text" className="form-control" value={descripcion}
                                            onChange={(e) => {
                                                setDescripcion(e.target.value)
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="mt-4 text-center">
                                    <button className="btn btn-outline-primary px-4" type="button"
                                        onClick={handleEditarPerfil}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


