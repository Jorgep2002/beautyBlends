


import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
 import logo from '../../assets/img/unnamed.png' 
 import panelU1 from '../../assets/img/panelAu1.png' 
 import panelU2 from '../../assets/img/panelAU2.png' 
 import panelU3 from '../../assets/img/panelU3.png' 


function BaseAdmin({contenido,titulo}){
  const [btnState, setBtnState] = useState(false);

    let navigate = useNavigate();

    // Sesiones

    const location = useLocation();
    const  user  = location.state;
    console.log(user)

    if(!user){
        return <Navigate to="/"/>
    }else if(user.user.id_correo === ''){
      return <Navigate to="/"/>
    }
    let id_correo = user.user.id_correo;
    console.log(id_correo)
    let rol  = user.user.rol;
    console.log(rol)
    let token = user.user.token;
    console.log(token)
    if(rol!=="A"){
      return <Navigate to="/"/>

    }
    



    //RUTAS
    const handleAgregarMedico = () => {
        // console.log(id_correo)
        navigate('/nuevoProfesional/', { state: {user:{id_admin:id_correo,rol:rol,token:token}} })
        
    }
    const handleAgregarPaciente= () => {
      // console.log(id_correo)
      navigate('/nuevoPaciente/', { state: {user:{id_admin:id_correo,rol:rol,token:token}} })
      
     }
    const handleCrearCita = () => {
        // console.log(id_correo)
        navigate('/nuevaCita/', { state: {user:{id_admin:id_correo,rol:rol,token:token}} })
        
    }
    const estadosUsuarios = () =>{
      navigate('/panelEstados/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    }
    const estadosCitas = () =>{
      navigate('/panelEstadosCitas/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    }
    const home = () => {
      navigate('/panelAdmin/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    
    }
    
    

    const gestionarUsuarios = () => {
      navigate('/GestionarUsuarios/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    
    }


    const logOut = () => {
      id_correo = null;
      rol = null;
      console.log(id_correo); // Imprime 'null'
      if(!id_correo){
          navigate('/', {replace:true});
      }
    }
   
    

    //Responsive menu toggle
    const toggle = ()=>{
      setBtnState(btnState => !btnState);


      
    }
    let toggleClassCheck = btnState ? 'active-menu-usuario': null;
    let toggleClassCheckArrow = btnState ? 'active-arrow': null;


    return(
        <Fragment>
            

        <div className="inicio-usuario-contenedor" > 
          <div class="navegacion-barra-inicio-usuario nombre-sitio-inicio-usuario">
          <img class="logo-panel" src={logo}alt=""/>
              <nav class="navegacion-inicio-usuario">
              <ul>
        <p> Perfil </p>
        <li><a onClick={home} className="a__perfil" ><i class="fa-solid fa-house-user"></i>Home</a></li>
        <p className="p_admin_usuarios"> Usuarios</p>
        <li><a onClick={gestionarUsuarios} className="a__perfil" ><i class="fa-solid fa-users"></i>Gestionar Usuarios</a></li>
        <li><a onClick={handleAgregarMedico} className="a__perfil" ><i class="fa-solid fa-user"></i>Agregar Medico</a></li>
        <li><a onClick={handleAgregarPaciente} className="a__perfil" ><i class="fa-solid fa-user"></i>Agregar Paciente</a></li>
        <li><a onClick={estadosUsuarios} className="a__perfil" ><i class="fa-solid fa-check"></i>Estados Usuarios</a></li>
        <p className="p_admin_usuarios"> Citas </p>
        <li onClick={handleCrearCita}><a className="a__perfil" ><i class="fa-regular fa-calendar-plus"></i>Programa una cita</a></li>
        <li ><a onClick={estadosCitas} className="a__perfil" ><i class="fa-regular fa-calendar-plus"></i>Estados citas</a></li>
        <p className="p_admin_usuarios"> Salir </p>
        <li><a  onClick={logOut}className="a__perfil"><i class="fa-solid fa-right-from-bracket"></i>Log Out</a></li>
      </ul>
             </nav>
          </div>
          <section className={`desarrollo-home ${toggleClassCheck}`}>
            
                  <div class="content-inicio-desarrollo">
                  <div class="perfil">


<i onClick={toggle} class={`fa-solid fa-arrow-right ${toggleClassCheckArrow}`} style={{color: "#0a7957", marginTop:"22px", fontSize:"20px"}}></i>
  
  
   <div className="perfil-menu-usuario"> 

<div class="menu-perfil">
<ul>
  <li><a >Salir</a></li>
</ul>
</div>
   </div>
</div>
                <div class="titulo-centrado">
                  <h2 style={{color:"rgb(0 102 118)"}}>{titulo}</h2>
                </div>


                {React.cloneElement(contenido, { gestionarUsuarios:gestionarUsuarios,handleAgregarMedico: handleAgregarMedico, handleCrearCita: handleCrearCita, estadosCitas: estadosCitas,
                 token:token, id_admin:id_correo, rol:rol
              })}


                      </div>
                      </section>
              </div>
             
                   
                
                </Fragment>
    )
}

export default BaseAdmin;