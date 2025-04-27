import React from "react";
import UserProfile from "../components/UserProfile";

const PerfilUser = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <UserProfile />
      </div>
    </div>
  );
};

export default PerfilUser;
