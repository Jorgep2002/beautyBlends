import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
//  CSS
 import  '../../assets/css/panelUsuario.css';
// imagenes

import logo from '../../assets/img/unnamed.png' 
import   '../../assets/css/confirmacionCita.css' 
import imag from '../../assets/img/Final.png' 


function ConfirmacionCitaCancelada(props){
  //menu resposive
  const [btnState, setBtnState] = useState(false);

    let navigate = useNavigate();



    return(


        <Fragment>




        <div class="container-confirmacion-cita">
      <div class="caja-confirmacion-cita">
        <h1>¡CITA Cancelada!</h1>
        <img src={imag} alt="Descripción de la imagen"/>
        <p class="descripcion-confirmacion-cita">¡Bienvenido(a) a nuestro centro médico! Estamos encantados de atenderte , tu cita ha sido correctamente cancelada </p>
        <button class="agregar-cita-button" onClick={props.handleHistorial}>Ver historial de citas</button>
      </div>
    </div>
    
        </Fragment>
    )
}

export default ConfirmacionCitaCancelada;