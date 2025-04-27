// FRONTEND - src/front/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { PerfilTrabajador } from "./pages/PerfilTrabajador"; // 👈 Ya integrado
import { Vacante} from "./pages/Vacante"; // 👈 Ya integrado
import { ListaDeVacantes } from "./pages/ListaDeVacantes";
import { RegistroUser } from "./pages/RegistroUser";
import { ListaDeTrabajos } from "./pages/ListaDeTrabajos";
import { Vacantes } from "./pages/Vacantes";



export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/trabajador/:id" element={<PerfilTrabajador />} />
      <Route path="/vacante/:id" element={<Vacante/>}/>
      <Route path="/vacantes" element={<ListaDeVacantes />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/registro" element={<RegistroUser/>}/>
      <Route path="/vacanteslistado" element={<Vacantes />} />
    
    </Route>
  )
);
