


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
    if(rol!=="M"){
      return <Navigate to="/"/>

    }
    



    //RUTAS
    const NuevohistorialClinico = () => {
        
        navigate('/nuevoHistorialClinico', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
        
    }
    const historialClinico = () =>{
      navigate('/historialClinico', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
    }
   
    const nuevaNota = () =>{
      navigate('/nuevaNota', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
    }
    const notas = () =>{
      navigate('/Notas', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
    }
    const citasProgramadas = () => {
      navigate('/citasProgramadas/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    
  }
   
  
    const home = () => {
      navigate('/panelProfesional/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });
    
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
        <li><a onClick={NuevohistorialClinico} className="a__perfil" ><i class="fa-solid fa-book-medical"></i>Nuevo Historial Clinico</a></li>
        <li><a onClick={historialClinico} className="a__perfil" ><i class="fa-solid fa-laptop-medical"></i>Consultar Historial </a></li>
          <li><a onClick={nuevaNota} className="a__perfil" ><i class="fa-solid fa-file-medical"></i>Nueva Nota de consulta</a></li>
          <li><a onClick={notas} className="a__perfil" ><i class="fa-solid fa-notes-medical"></i>Consultar Notas </a></li>
       
        <p className="p_admin_usuarios"> Citas </p>
        <li><a onClick={citasProgramadas} className="a__perfil" ><i class="fa-solid fa-calendar-check"></i>Citas Programadas </a></li>
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


                {React.cloneElement(contenido, { historialClinico:historialClinico, nuevaNota: nuevaNota,
                 token:token, id_correo:id_correo, rol:rol
              })}


                      </div>
                      </section>
              </div>
             
                   
                
                </Fragment>
    )
}

export default BaseAdmin;