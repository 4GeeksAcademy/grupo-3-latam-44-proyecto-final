import React from 'react'
import { Link } from "react-router-dom";

export const NavbarLogin = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="/src/front/assets/img/logo.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    JobFinder
                </a>
                <div className="d-flex">
                    <Link to="/registro"><button className="btn btn-outline-success me-2" type="button">Registrarme</button></Link>
                    <Link to="/"><button className="btn btn-success me-2" type="button">Home</button></Link>
                </div>
            </div>

        </nav>
    )
}
