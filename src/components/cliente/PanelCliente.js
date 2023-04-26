import React, { Fragment , useEffect} from "react";

//  CSS
 import  '../../assets/css/panelUsuario.css';
// imagenes
import panelU1 from '../../assets/img/panelU1.png' 
import panelU2 from '../../assets/img/panelU2.png' 
import panelU3 from '../../assets/img/panelU3.png' 


function PanelCliente(props){
  
    return(


        <Fragment>
            <div className="container__cards">
            <div class="card">
              <div class="cover">
                <img src={panelU1}alt=""/>
                <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Programa tu cita</h2>
                <p>Aquí podrás programar una cita con el especialista que desees y a la hora que quieras.</p>
                <input onClick={props.handleAgregarCita} type="button" value="Reserva Aquí"/>
              </div>
            </div>
            
            <div class="card">
              <div class="cover">
              <img src={panelU2}alt=""/>
                  <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Cancelar cita</h2>
                <p>Aquí podrás cancelar las citas que desees, recuerda que tienes que cancelar con 3h de anticipación.</p>
                <input   type="button" value="Cancelar"/>
              </div>
            </div>
  
            <div class="card">
              <div class="cover">
              <img src={panelU3}alt=""/>
                <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Ver historial de citas</h2>
                <p>Podrás consultar fácilmente todas tus citas anteriores y encontrar la información que necesitas.</p>
                  <input onClick={props.handleHistorial}  type="button" value="Ver"/>
                </div>
              </div>
          
            
              </div>
        </Fragment>
    )
}

export default PanelCliente;