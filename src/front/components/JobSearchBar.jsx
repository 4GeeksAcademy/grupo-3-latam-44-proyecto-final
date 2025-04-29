import React from "react";

const JobSearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="input-group mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar empleos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="button">
                Buscar
            </button>
        </div>
    );
};

export default JobSearchBar;
