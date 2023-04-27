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


function ConfirmacionCita(props){
  //menu resposive
  const [btnState, setBtnState] = useState(false);

    let navigate = useNavigate();


    const cancelarCita = () => {
      // console.log(id_correo)
      return  navigate('/cancelarCitas/', { state: {user:{id_correo:props.id_correo,rol:props.rol,token:props.token}} })
    }
    return(


        <Fragment>




        <div class="container-confirmacion-cita">
      <div class="caja-confirmacion-cita">
        <h1>¡CITA CONFIRMADA!</h1>
        <img src={imag} alt="Descripción de la imagen"/>
        <p class="descripcion-confirmacion-cita">¡Bienvenido(a) a nuestro centro médico! Estamos encantados de saber que has elegido confiar en nosotros para cuidar de tu salud. En primer lugar, queremos agradecerte por programar una cita médica con nosotros de manera presencial. </p>
        <button class="agregar-cita-button" onClick={cancelarCita}>Ver proximas citas</button>
      </div>
    </div>
    
        </Fragment>
    )
}

export default ConfirmacionCita;