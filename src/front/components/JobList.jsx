import React from "react";

const jobs = [
    {
        id: 1,
        title: "Desarrollador Full Stack",
        company: "Tech Solutions",
        location: "Ciudad de México",
        description: "Buscamos un desarrollador apasionado por tecnologías web modernas.",
    },
    {
        id: 2,
        title: "Analista de Datos",
        company: "DataCorp",
        location: "Querétaro",
        description: "Responsable de la extracción y análisis de datos para proyectos estratégicos.",
    },
    {
        id: 3,
        title: "Diseñador UI/UX",
        company: "Creative Studio",
        location: "Remoto",
        description: "Diseña experiencias digitales atractivas y funcionales.",
    },
];

const JobList = ({ searchTerm }) => {
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="row">
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                    <div className="col-md-4 mb-4" key={job.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{job.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                                <p className="card-text">{job.description}</p>
                                <div className="mt-auto">
                                    <p className="text-muted small mb-2">{job.location}</p>
                                    <button className="btn btn-outline-primary w-100">
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">No se encontraron empleos.</p>
            )}
        </div>
    );
};

export default JobList;
