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

    console.log(props.token)
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
    console.log(props.token)
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.get('/citas/Administador/citasProgramadas')
    .then(({data})=>{
      console.log(data)
      setCitasEspecialidad(data)

         
           
   }).catch(({response})=>{

       if(response.status == 404){

        Swal.fire({
          icon: 'error',
          title: 'No hay citas programadas',
          text: response.msg,
          confirmButtonText: '¡Listo!'
        });
        
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
useEffect(() => {

    getCitas();
  
  }, []);
  
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

   
    let estadoDos = {
      estado:2
    }
    const completada = (id_cita) =>{

    clienteAxios.put('/citas/updateStatus/'+id_cita,estadoDos)
  .then(({data})=>{
    console.log(data)
               Swal.fire({
         icon: 'success',
         title: 'Cita Actualizada',
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
            {data.map((cita) => {
              return (
                <div class="contenedor-principal-gestionarU contenedor_administrarcitas" key={cita.id_cita}>
                        <div class="contenedor-inputs-gestionarU" >
                          <div class="input-gestionarU">
                            <div class="label-gestionar">
                            <label for="nombres"><i style={{color:"green"}} class="fa-regular fa-clock"></i> Hora inicio : {cita.cita_hora_inicio}</label>
                            <label for="nombres"><i style={{color:"red"}} class="fa-regular fa-clock"> </i>  Hora fin : {cita.cita_hora_fin}</label>
                            <label for="nombres"><i class="fa-regular fa-id-badge"></i>  Id Medico : {cita.fk_id_medico}</label>
                            <label for="nombres"><i class="fa-regular fa-id-badge"></i>  Id paciente  : {cita.fk_id_paciente}</label>
                          </div>
                            </div>
                      
                        
                        </div>
                        <div class="contenedor-botones-gestionarU">

                                <button onClick={()=> completada(cita.id_cita)}className="activar">Completada</button>
                          


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