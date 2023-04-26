import React, { Component, Fragment, useEffect } from "react";
import Swal from 'sweetalert2';

import  { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
//  import  '../../assets/css/home.css';
import clienteAxios from  '../../config/axios';
import   '../../assets/css/perfilUsuario.css' 
import {format} from 'timeago.js'
import   '../../assets/css/agregarCitasCliente.css' 
import logo from '../../assets/img/unnamed.png' 

function AdminEstados (props){
  
    let navigate = useNavigate();


    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
      

    const [citasEspecialidad, setCitasEspecialidad] = useState([])
    
    
    //Guardar formulario y errores de este
    const [initialForm, setInitialForm] = useState({
  
       
        estado: '0',
        
      });
      const { id } = useParams();
    

    
    
    
 
   //Guardar datos en el state
   const getCitas = ()=>{
    clienteAxios.get('http://25.0.53.159:3000/api/users/administrador/estadoUsuario/'+initialForm.estado)
    .then(({data})=>{
      console.log(data)
      setCitasEspecialidad(data)

         
           
   }).catch(({response})=>{

       if(response.status == 404){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.msg,
          confirmButtonText: 'Entendido'
        }).then(() => {
          window.location.reload();
        });
        //  window.location.reload()
        
        }
   })
   }
   const handleChange = (e) =>{
     const {name, value} = e.target;
     setInitialForm({
       ...initialForm,
       [name]:value
      })
      console.log(initialForm.estado)
   
} 
  const buscarCita = () =>{
    console.log(initialForm.estado)
    getCitas();
  }
   //citas
   
   const handlePages = (event)=>{
    setCurrentPage(Number(event.target.id));
  }


  const pages = [];
  for(let i = 1; i<= Math.ceil(citasEspecialidad.length/itemsPerPage);i++){
      pages.push(i)
  }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirtsItem = indexOfLastItem - itemsPerPage;
  const currentItems = citasEspecialidad.slice(indexOfFirtsItem, indexOfLastItem)

  const renderPageNumbers = pages.map(number=>{
    if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit ){
        return(
            <li key={number} id={number} onClick={handlePages}
            className={currentPage===number? "pActive" :null}>
                {number}
            </li>
        );

    }else{
        return null
    }
  })

    let estadoUno = {
      estado:1
    }
    const activar = (id_correo) =>{

      clienteAxios.put('http://25.0.53.159:3000/api/users/updateStatus/'+id_correo,estadoUno)
    .then(({data})=>{
      console.log(data)
                 Swal.fire({
           icon: 'success',
           title: 'Usuario Activado',
           text: data.msg,
           confirmButtonText: '¡Listo!'
         });
  
         getCitas();
    
           
   }).catch(({response})=>{
  
       if(response.status === 400){
  
           Swal.fire({
               icon: 'error',
               title: '¡Error!',
               text: response.data.msg,
               confirmButtonText: 'Entendido'
             });
       }
   })
  }
    let estadoTres = {
      estado:0
    }
    const desactivar = (id_correo) =>{

    clienteAxios.put('http://25.0.53.159:3000/api/users/updateStatus/'+id_correo,estadoTres)
  .then(({data})=>{
    console.log(data)
               Swal.fire({
         icon: 'success',
         title: 'Usuario Desactivado',
         text: data.msg,
         confirmButtonText: '¡Listo!'
       });

       getCitas();
  
         
 }).catch(({response})=>{

     if(response.status === 400){

         Swal.fire({
             icon: 'error',
             title: '¡Error!',
             text: response.data.msg,
             confirmButtonText: 'Entendido'
           });
     }
 })
  };
    const handlePrevBtn  = () =>{
        setCurrentPage(currentPage -1)

        if((currentPage-1)%pageNumberLimit== 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }
    const handleNextBtn = () =>{
        setCurrentPage(currentPage+1)
        if(currentPage+1>maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    let pageIncrementBtn = null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementBtn =< li onClick={handleNextBtn}> &hellip; </li>
    }
    let pageDecrementBtn = null;

    if(pages.length > maxPageNumberLimit){
        pageDecrementBtn =< li onClick={handlePrevBtn}> &hellip; </li>
    }

    const renderData = (data) =>{
      return(
        data.length === 0 ? (
          <p style={{textAlign:"center"}}></p>
        ) : (
          <div class="grid-container">
            {data.map((usuario) => {
              return (
                <div class="contenedor-principal-gestionarU adminestados" key={usuario.id_usuario_correo}>
                        <div class="contenedor-inputs-gestionarU" >
                          <div class="input-gestionarU">
                            <div class="label-gestionar">
                            <label for="nombres">{usuario.id_usuario_correo}</label>
                          </div>
                            </div>
                      
                        
                        </div>
                        <div class="contenedor-botones-gestionarU">

                                {usuario.usu_estado == 1 && (
                                <button onClick={()=> desactivar(usuario.id_usuario_correo)}className="desactivar">Desactivar</button>
                              )}

                              {usuario.usu_estado == 2 && (
                                <>
                                  <button onClick={()=> activar(usuario.id_usuario_correo)}className="activar_estados">Activar</button>
                                  <button onClick={()=> desactivar(usuario.id_usuario_correo)}className="desactivar">Desactivar</button>
                                </>
                              )}

                              {usuario.usu_estado == 0 && (
                                <button onClick={()=> activar(usuario.id_usuario_correo)} className="activar_estados">Activar</button>
                              )}


                        </div>
                 </div>
                
              );
            })}
          </div>
        )
      )
    }
    

      
    return(
        <Fragment>
       
        <div class="contenedor_agregarC">
        <div class="campo-registro">
            <select required  onChange={handleChange} name="estado" className="Especialidad select-custom"  id="" value={initialForm.estado} >

            <option  selected disabled  >Usuarios:</option>
                <option value="0">Inactivos</option>
                <option value="1">Activos</option>
                <option value="2">Pendientes</option>
                </select >
        </div>
        <button class="agregar-cita-button" onClick={buscarCita}>Buscar</button>





        {renderData(currentItems)}

        {citasEspecialidad.length > 0 && (
            <ul className="pageNumbers">
              <li>
                <button onClick={handlePrevBtn} disabled={currentPage === pages[0]}>
                  Anterior
                </button>
              </li>
              {renderPageNumbers}
              <li>
                <button
                  onClick={handleNextBtn}
                  disabled={currentPage === pages[pages.length - 1]}
                >
                  Siguiente
                </button>
              </li>
            </ul>
        )}
            </div>

       










      


        </Fragment>
    )
}

export default AdminEstados;