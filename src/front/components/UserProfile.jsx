import React from "react";

const UserProfile = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=68"
                  alt="avatar"
                  className="rounded-circle shadow"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h3 className="mt-3 fw-bold">Levi Villarreal</h3>
                <p className="text-muted mb-0">Desarrollador Full Stack</p>
              </div>

              <hr />

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value="Levi" readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" value="Villarreal" readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" value="levi@email.com" readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" value="+52 442 123 4567" readOnly />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Sobre mí</label>
                    <textarea className="form-control" rows="3" placeholder="Escribe algo sobre ti..." defaultValue="Amante de la química, los videojuegos y la programación." readOnly />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="btn btn-outline-primary px-4" type="button">
                    Editar perfil
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

export default UserProfile;
