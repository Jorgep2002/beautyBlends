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

    const { format, register } = require('timeago.js')
    register('es_ES', (number, index, total_sec) => [
        ['justo ahora', 'ahora mismo'],
        ['Hace %s segundos', 'En %s segundos'],
        ['Hace 1 minuto', 'En 1 minuto'],
        ['Hace %s minutos', 'En %s minutos'],
        ['Hace 1 hora', 'En 1 hora'],
        ['Hace %s horas', 'in %s horas'],
        ['Hace 1 dia', 'En 1 dia'],
        ['Hace %s dias', 'En %s dias'],
        ['Hace 1 semana', 'En 1 semana'],
        ['Hace %s semanas', 'En %s semanas'],
        ['1 mes', 'En 1 mes'],
        ['Hace %s meses', 'En %s meses'],
        ['Hace 1 año', 'En 1 año'],
        ['Hace %s años', 'En %s años']
    ][index]);
    // Referencia traduccion de timeago.jshttps://github.com/ofaaoficial/timeago.js-es_ES

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(6)
    const timeago = timestamp => format(timestamp, 'es_ES');
    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
      

    const [citasEspecialidad, setCitasEspecialidad] = useState([])
    
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
    clienteAxios.get('/citas/citasAsignadas/'+props.id_correo)
    .then(({data})=>{
       console.log(data.citasAsignadas)
       setCitasEspecialidad(data.citasAsignadas)
    //    console.log(citasEspecialidad +'CITAS ASIGNADAS')

            
    }).catch(({response})=>{

        // if(response.status === 400){

        //     Swal.fire({
        //         icon: 'error',
        //         title: '¡Error!',
        //         text: response.data.msg,
        //         confirmButtonText: 'Entendido'
        //       });
        // }
    })
  
  }, []);


    

    
 
 
   //Guardar datos en el state
   const getCitas = ()=>{
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.get('/citas/'+initialForm.area)
    .then(({data})=>{
      console.log(data +'aweaweaweaweaw')
      setCitasEspecialidad(data.citasEspecialidad)
      console.log(data.citasEspecialidad + 'CITAS')
                 Swal.fire({
           icon: 'success',
           title: '!',
           text: data.msg,
           confirmButtonText: '¡Listo!'
         });
         console.log(data.citasEspecialidad + 'CITAS')

         
           
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
   const handleChange = (e) =>{
     const {name, value} = e.target;
     setInitialForm({
       ...initialForm,
       [name]:value
      })
      console.log(initialForm.area)
   
} 
  const buscarCita = () =>{
    console.log(initialForm.area)
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

function TiempoParaCita({fechaCita}) {
const fechaCitaObj = new Date(fechaCita);
const fechaActualObj = new Date();
const unDia = 24 * 60 * 60 * 1000; // 1 día en milisegundos
const unMes = 30 * unDia; // Asumimos 30 días por mes
const diasParaCita = Math.ceil((fechaCitaObj - fechaActualObj) / unDia);
const mesesParaCita = Math.floor(diasParaCita / 30);
const diasRestantes = diasParaCita % 30;

if (diasParaCita <= 0) {
return <span>La cita ya pasó</span>;
} else if (mesesParaCita === 0) {
const tiempoTranscurrido = format(fechaCitaObj, 'es', {max: 1});
return <span>Faltan {diasParaCita} días para la cita ({tiempoTranscurrido})</span>;
} else {
const tiempoTranscurrido = format(fechaCitaObj, 'es', {max: 2});
return (
  <span>
    Faltan {mesesParaCita} meses y {diasRestantes} días para la cita 
  </span>
);
}
}
    let parametroUser = {
      id_correo:props.id_correo
    }
    const agregarCita = (id_cita) =>{
        console.log(id_cita)
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.put('/citas/asignarCita/'+id_cita,parametroUser)
    .then(({data})=>{
      console.log(data)
                 Swal.fire({
           icon: 'success',
           title: '!',
           text: data.msg,
           confirmButtonText: '¡Listo!'
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
                <div  class="cajas_citas" key={cita.cita_id}>
                  <div class="flex_descripcion">
                    <label class="doctor" for="doctor1">{cita.Medico.me_nombres} {cita.Medico.me_apellido_paterno}</label>
                    <div class="grid-item">
                      <label class=""><i class="fa-regular fa-calendar"></i>   {cita.cita_fecha}</label>
                      <label class=""><i style={{color:"green"}} class="fa-regular fa-clock"></i>   {cita.cita_hora_inicio}-<i style={{color:"red"}} class="fa-regular fa-clock"></i>   {cita.cita_hora_fin}</label>
                    </div>
                    <label class="Tiempo_restante">{timeago(cita.cita_fecha)}</label>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )
    }

      citasEspecialidad.map((cita)=>{
        console.log(cita.id_cita)
      })
    return(
        <Fragment>
       
       
        
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
          


        </Fragment>
    )
}

export default Historial;