// src/front/assets/pages/RegistroUser.jsx
import RegisterFormUser from "../components/RegisterFormUser";
import { NavbarRegistro } from '../components/NavbarRegistro';

function RegistroUser() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <NavbarRegistro/>
      <RegisterFormUser />
    </div>
  );
}

export default RegistroUser;
