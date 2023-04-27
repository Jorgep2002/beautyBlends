


import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
 import logo from '../../assets/img/unnamed.png' 
 import panelU1 from '../../assets/img/panelAu1.png' 
 import panelU2 from '../../assets/img/panelAU2.png' 
 import panelU3 from '../../assets/img/panelU3.png' 


function PanelAdmin(props){
  
    return(
        <Fragment>
            <div class="container__cards">
                    <div class="card">
                      <div class="cover">
                        <img src={panelU3} alt=""/>
                        <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Gestionar Usuarios</h2>
                        <p> Podras agregar Gestionar todos los usuarios regitrados en la base de datos .</p>
                        <input onClick={props.gestionarUsuarios}  type="button" value="Gestionar usuarios"/>
                      </div>
                    </div>
                    <div class="card">
                      <div class="cover">
                      <img  src={panelU2} alt=""/>
                          <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Agregar citas</h2>
                        <p>Aquí podrás agregar las citas y horarios que le corresponden a cada medico.</p>
                        <input onClick={props.handleCrearCita} type="button" value="Agregar citas"/>
                      </div>
                    </div>
          
                    <div class="card">
                      <div class="cover">
                      <img  src={panelU1} alt=""/>
                        <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Consultar Citas</h2>
                          <p>Gestiona  fácilmente todas las  citas que se encuentren en el sistema de beautyBlends.</p>
                          <input onClick={props.estadosCitas} type="button" value="Administrar Citas"/>
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}

export default PanelAdmin;