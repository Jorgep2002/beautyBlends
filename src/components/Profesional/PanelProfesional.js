


import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
 import logo from '../../assets/img/unnamed.png' 
 import panelU1 from '../../assets/img/panelAu1.png' 
 import panelU2 from '../../assets/img/panelAU2.png' 
 import panelU3 from '../../assets/img/panelU3.png' 


function PanelProfesional(props){
  
    return(
        <Fragment>
            <div class="container__cards">
                    <div class="card">
                      <div class="cover">
                        <img src={panelU1} alt=""/>
                        <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Historial Clinico</h2>
                        <p> Podras consultar el historial clinico de los pacientes registrados en el sistema  .</p>
                        <input onClick={props.historialClinico}  type="button" value="Agregar"/>
                      </div>
                    </div>
                    <div class="card">
                      <div class="cover">
                      <img  src={panelU2} alt=""/>
                          <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Agregar notas</h2>
                        <p>En este aparatado podrás agregar las notas para cada consulta corresponden a un paciente.</p>
                        <input onClick={props.nuevaNota} type="button" value="Agregar"/>
                      </div>
                    </div>
          
                    <div class="card">
                      <div class="cover">
                      <img  src={panelU3} alt=""/>
                        <div class="img__back"></div>
                      </div>
                      <div class="description">
                        <h2>Consultar Citas</h2>
                          <p>Gestiona  fácilmente todas las  citas que se encuentren en el sistema de beautyBlends.</p>
                          <input type="button" value="Gestionar"/>
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}

export default PanelProfesional;