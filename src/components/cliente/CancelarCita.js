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

function CancelarCitas (props){
  
    let navigate = useNavigate();


    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
      

    const [citasEspecialidad, setCitasEspecialidad] = useState([])
    
    //boton Resposive
    const [btnState, setBtnState] = useState(false);
    
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
 

      const { id } = useParams();
    

    
      useEffect(() => {

        getCitas();
      }, []);
    
 
   //Guardar datos en el state
   const getCitas = ()=>{
  
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.get('/citas/citasProximas/'+props.id_correo)
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
    const cancelarCita = (id_cita) =>{
       
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.put('/citas/cancelarCita/'+id_cita)
    .then(({data})=>{
      console.log(data)
                
         navigate('/confirmacionCitaCancelada/', { state: {user:{id_correo:props.id_correo,rol:props.rol,token:props.token}} });

         
           
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
          <p style={{textAlign:"center"}}>No hay citas </p>
        ) : (
          <div class="grid-container">
            {data.map((cita) => {
              return (
                <div class="cajas_citas" key={cita.cita_id}>
                  <div class="flex_descripcion">
                    <label class="doctor" for="doctor1">{cita.Medico.me_nombres} {cita.Medico.me_apellido_paterno}</label>
                    <div class="grid-item">
                      <label class="">{cita.cita_fecha}</label>
                      <label class="">{cita.cita_hora_inicio}-{cita.cita_hora_fin}</label>
                    </div>
                    <label class="Tiempo_restante"><TiempoParaCita fechaCita={cita.cita_fecha}></TiempoParaCita></label>
                    <button  style={{backgroundColor:"red"}} class="agregar-cita-button" onClick={()=> cancelarCita(cita.id_cita)}>Cancelar</button>
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

        <ul className="pageNumbers">
            <li>
                <button  onClick={handlePrevBtn}
                disabled={currentPage == pages[0] ? true:false}>
                    Anterior
                </button>
            </li>
           {renderPageNumbers}
            <li>
                <button onClick={handleNextBtn}
                disabled={currentPage == pages[pages.length-1] ? true:false}

                >
                    Siguiente
                </button>
            </li>
            </ul>
            </div>

       










      


        </Fragment>
    )
}

export default CancelarCitas;