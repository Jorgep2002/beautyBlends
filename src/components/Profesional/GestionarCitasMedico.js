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
import axios from "axios";
import {format} from 'timeago.js'
import   '../../assets/css/agregarCitasCliente.css' 
import logo from '../../assets/img/unnamed.png' 

function Historial (props){
  
    let navigate = useNavigate();


    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
      

    const [citasMedico, setCitasMedico] = useState([])
    
    //boton Resposive
    const [btnState, setBtnState] = useState(false);
    
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
    const [initialForm, setInitialForm] = useState({
  
       
        area: 'Fisioterapia',
        
      });
      const { id } = useParams();
    
useEffect(() => {

    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.get('http://25.0.53.159:3000/api/citas/medico/citasProgramadas/'+props.id_correo)
    .then(({data})=>{
       setCitasMedico(data)
        console.log(citasMedico)
            
    }).catch(({response})=>{

            if(response.status === 404){

                 Swal.fire({
                     icon: 'error',
                     title: '¡Error!',
                    text: response.data.msg,
                     confirmButtonText: 'Entendido'
                   });
             }
    })
  
  }, []);


 
   //citas
   
   const handlePages = (event)=>{
    setCurrentPage(Number(event.target.id));
  }


  const pages = [];
  for(let i = 1; i<= Math.ceil(citasMedico.length/itemsPerPage);i++){
      pages.push(i)
  }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirtsItem = indexOfLastItem - itemsPerPage;
  const currentItems = citasMedico.slice(indexOfFirtsItem, indexOfLastItem)

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

    const estado = {
        estado: 2
    }
    const cancelarCita = (id_cita) =>{
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.put('http://25.0.53.159:3000/api/citas/updateStatus/'+id_cita,estado)
    .then(({ data }) => {
        console.log(data.msg);
        Swal.fire({
          icon: 'success',
          title: 'Cita Cancelada',
          text: data.msg,
          confirmButtonText: 'Entendido'
        }).then(() => {
          window.location.reload();
        });
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
          <p style={{textAlign:"center"}}>No hay citas </p >
        ) : (
          <div class="grid-container">
            {data.map((cita) => {
              return (
                <div  class="cajas_citas" key={cita.id_cita}>
                  <div class="flex_descripcion">
                    <label class="doctor" for="doctor1">{cita.fk_id_paciente}</label>
                    <div class="grid-item">
                      <label class=""><i class="fa-regular fa-calendar"></i>   {cita.cita_fecha}</label>
                      <label class=""><i style={{color:"green"}} class="fa-regular fa-clock"></i>   {cita.cita_hora_inicio}-<i style={{color:"red"}} class="fa-regular fa-clock"></i>   {cita.cita_hora_fin}</label>
                      <button class="agregar-cita-button" onClick={()=> cancelarCita(cita.id_cita)}>Completar</button>

                    </div>
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
       
       
        
            {renderData(currentItems)}
        
      {citasMedico.length > 0 && (
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
          


        </Fragment>
    )
}

export default Historial;