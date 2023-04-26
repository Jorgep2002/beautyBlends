import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';
import Swal from 'sweetalert2';

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
import panelU1 from '../../assets/img/panelU1.png' 
import panelU2 from '../../assets/img/panelU2.png' 
import panelU3 from '../../assets/img/panelU3.png' 
import logo from '../../assets/img/unnamed.png' 
import clienteAxios from  '../../config/axios';


function BaseCliente({contenido, titulo}){
  //menu resposive
  const [btnState, setBtnState] = useState(false);

    let navigate = useNavigate();


    // // Sesiones
    // const location = useLocation();
    // const  user  = location.state;
    // // console.log(user)

    // if(!user){
    //     return <Navigate to="/"/>
    // }else if(user.user.id_correo === ''){
    //   return <Navigate to="/"/>
    // }
    // let id_correo = user.user.id_correo;
    // console.log(id_correo)
    // let rol  = user.user.rol;
    // let token  = user.user.token;
    // console.log(rol)
    // if(rol!=="P"){
    //   return <Navigate to="/"/>

    // }

  





    //Responsive menu toggle
    const toggle = ()=>{
      setBtnState(btnState => !btnState);


      
    }
    let toggleClassCheck = btnState ? 'active-menu-usuario': null;
    let toggleClassCheckArrow = btnState ? 'active-arrow': null;

    //Rutas
    const home = () => {
        // navigate('/panel/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} });

    }
    const handlePerfil = () => {
        // console.log(id_correo)

        // navigate('/perfil/'+id_correo, { state: {user:{id_correo:id_correo,rol:rol,token:token}} });

    }
    const handleContrasenia = () =>{

        // navigate('/contrasenia/'+id_correo, { state: {user:{id_correo:id_correo,rol:rol,token:token}} });

    }
     
    const handleAgregarCita = () => {
      // console.log(id_correo)
      // return  navigate('/citas/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
      
  }
  const cancelarCita = () => {
    // console.log(id_correo)
    // return  navigate('/cancelarCitas/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })
    
}

   
 

    const logOut = () => {
        // id_correo = null;
        // rol = null;
        // console.log(id_correo); // Imprime 'null'
        // if(!id_correo){
        //     navigate('/', {replace:true});
        // }
    }
   
    const handleHistorial = () =>{
        // return  navigate('/historial/', { state: {user:{id_correo:id_correo,rol:rol,token:token}} })

    }
   
    const darmeBaja = () =>{
  //   clienteAxios.put('http://25.0.53.159:3000/api/users/solicitarBajaCuenta/'+id_correo)
  //   .then(({data})=>{
  //     console.log(data)
  //                Swal.fire({
  //          icon: 'success',
  //          title: 'Estado actualizado',
  //          text: data.msg,
  //          confirmButtonText: '¡Listo!'
  //        });

         
           
  //  }).catch(({response})=>{

  //      if(response.status === 400){

  //          Swal.fire({
  //              icon: 'error',
  //              title: '¡Error!',
  //              text: response.data.msg,
  //              confirmButtonText: 'Entendido'
  //            });
  //      }
  //  })
    };

    return(


        <Fragment>





<div className="inicio-usuario-contenedor" > 
  <div class="navegacion-barra-inicio-usuario nombre-sitio-inicio-usuario">
    <img class="logo-panel" src={logo}alt=""/>
      <nav class="navegacion-inicio-usuario">
      <ul>
        <p> Perfil </p>
        <li onClick={home}><a className="a__perfil" ><i class="fa-solid fa-house-user"></i>Home</a></li>
        <li onClick={handlePerfil}><a  className="a__perfil"><i class="fa-solid fa-pen"></i>Editar perfil</a></li>
        <li onClick={handleContrasenia}><a  className="a__perfil"><i class="fa-solid fa-pen"></i>Contraseña</a></li>
        <p> Citas </p>
        <li onClick={handleAgregarCita}><a className="a__perfil" ><i class="fa-regular fa-calendar-plus"></i>Programa una cita</a></li>
        <li onClick={cancelarCita}><a  className="a__perfil"><i class="fa-regular fa-calendar-days"></i>Citas Proximas</a></li>
        <li onClick={handleHistorial}><a className="a__perfil"><i class="fa-regular fa-calendar"></i>Ver historial de citas</a></li>
        <p> Salir </p>
        <li onClick={logOut}><a  className="a__perfil"><i class="fa-solid fa-right-from-bracket"></i>Log Out</a></li>
        <li onClick={darmeBaja}><a  className="a__perfil"><i class="fa-solid fa-ban"></i>Darme de baja</a></li>
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
              {/* <li onClick={handlePerfil}> <a>Editar perfil </a> </li> */}
              <li><a >Salir</a></li>
            </ul>
          </div>
               </div>
        </div>

        <div class="titulo-centrado">
          <h2 style={{color:"rgb(0 102 118)"}}>{titulo}</h2>
        </div>
        
        

            
            {React.cloneElement(contenido, { handleAgregarCita: handleAgregarCita, funcion2: "valor2", handleHistorial: handleHistorial,
            //  token:token, id_correo:id_correo, rol:rol
              })}


        
          </div>
        </section>
</div>





        </Fragment>
    )
}

export default BaseCliente;