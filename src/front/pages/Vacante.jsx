import React from 'react'
import { VacanteSingle } from '../components/VacanteSingle'
import {NavbarHome} from '../components/NavbarHome'
import { useParams } from "react-router-dom";

export const Vacante = () => {
   const { id } = useParams();
  return (
    <div>
        <VacanteSingle id={id}/>
    </div>
  )
}
