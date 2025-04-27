import React, { useState } from "react";
import JobSearchBar from "../components/JobSearchBar";
import JobList from "../components/JobList";

const BuscadorUser = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Encuentra tu próximo empleo</h2>
            <JobSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <JobList searchTerm={searchTerm} />
        </div>
    );
};

export default BuscadorUser;
