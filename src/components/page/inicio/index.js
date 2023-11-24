import React from 'react'
import { Link } from "react-router-dom";
import Portada from "images/testeoo.png";

export default function Inicio() {
    return (
        <div className="inicio">   

            <div className="inicio contenedor">   
                <img src={Portada} alt=""/>
                <h1 className='centrado'>Bienvenido a</h1>
                <h1 className='centrado2'>Choripan Sneakers</h1>

            </div>

        </div>
    )
}
