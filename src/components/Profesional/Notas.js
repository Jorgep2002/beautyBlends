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
import   '../../assets/css/agregarCitasCliente.css' 
import imgBuscar from '../../assets/img/search.png' 

function Citas (props){
    let navigate = useNavigate();
    const { format, register } = require('timeago.js')
    register('es_ES', (number, index, total_sec) => [
        ['justo ahora', 'ahora mismo'],
        ['hace %s segundos', 'en %s segundos'],
        ['hace 1 minuto', 'en 1 minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace 1 hora', 'en 1 hora'],
        ['hace %s horas', 'in %s horas'],
        ['hace 1 dia', 'en 1 dia'],
        ['hace %s dias', 'en %s dias'],
        ['hace 1 semana', 'en 1 semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['1 mes', 'en 1 mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace 1 año', 'en 1 año'],
        ['hace %s años', 'en %s años']
    ][index]);
    // Referencia traduccion de timeago.jshttps://github.com/ofaaoficial/timeago.js-es_ES

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(2)

    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    const [busqueda, setBusqueda] = useState("");
    const timeago = timestamp => format(timestamp, 'es_ES');

    const [notas, setNotas] = useState([])
    
    
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
    
      const { id } = useParams();
    

      const validateForm = (busqueda) =>{
    
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    
        if(!busqueda.trim()){
        errors.id_correo = "Busca un usuario por su email";
        }else if(!regexEmail.test(busqueda.trim())){
          errors.id_correo = "El campo  no tiene un formato valido"
        }else if(regexEmail.test(busqueda.trim()) && busqueda.trim()){
          errors.id_correo = ""
        }
          return errors
      }
      const buscar = (evento) => {
        setBusqueda(evento.target.value);
        setErrors(validateForm(busqueda))

        console.log(busqueda)
      }    
    
 
   //Guardar datos en el state
   const buscarNotas = ()=>{
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
    clienteAxios.get('/consultasMedicas/notasConsulta/consultarNotas/'+busqueda)
    .then(({data})=>{
        console.log(data)
      setNotas(data)

         
           
   }).catch(({response})=>{

       if(response.status === 404){

           Swal.fire({
               icon: 'error',
               title: '¡Error!',
               text: response.data.msg,
               confirmButtonText: 'Entendido'
             });
             setNotas([])
       }
   })
   }
  
  
   //citas
   
   const handlePages = (event)=>{
    setCurrentPage(Number(event.target.id));
  }


  const pages = [];
  for(let i = 1; i<= Math.ceil(notas.length/itemsPerPage);i++){
      pages.push(i)
  }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirtsItem = indexOfLastItem - itemsPerPage;
  const currentItems = notas.slice(indexOfFirtsItem, indexOfLastItem)

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
           title: 'Cita Agredada!',
           text: data.msg,
           confirmButtonText: '¡Listo!'
         });
         navigate('/confirmacionCita/', { state: {user:{id_correo:props.id_correo,rol:props.rol,token:props.token}} });

         
           
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
          <p style={{textAlign:"center"}}>Busca un paciente para poder ver sus notas de consulta</p>
        ) : (
          <div class="grid-container-notas">
            {data.map((nota) => {
              return (
                <div class="cajas_citas" key={nota.id_notas_consulta}>
                  <div class="flex_descripcion-notas ">
                    <div class="flex_titulos">
                    <label class="doctor" for="doctor1">Id: {nota.id_notas_consulta}</label>
                    <label class="doctor" for="doctor1">Historia: {nota.fk_id_historia_medica}</label>
                    </div>
                    <label class="doctor" for="doctor1">Medico: {nota.fk_id_medico} </label>
                    <div class="grid-item-notas">
                      <div class="grid-item-notasprimero">
                        <label  style={{fontWeight:"bold"}} class="">Evaluacion física:</label>
                        <label class="">{nota.not_evaluacion_física}</label>
                        <label  style={{fontWeight:"bold"}} class="">Plan tratamiento:</label>
                        <label class="">{nota.not_plan_tratamiento}</label>
                        <label  style={{fontWeight:"bold"}} class="">Sintomas consulta:</label>
                        <label class="">{nota.not_sintomas_consulta}</label>
                        </div>
                        <div class="grid-item-notasprimero">
                      <label  style={{fontWeight:"bold"}} class="">Fecha:</label>
                      <p>{nota.not_fecha}</p>
                      <label  style={{fontWeight:"bold"}} class="">Tiempo:</label>
                      <p>{timeago(nota.not_fecha)}</p>
                    </div>
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
       <div className="search-bar">




<input
type="text"
onChange={buscar}
placeholder="buscar paciente por correo"
value={busqueda}
>
</input>

<button
 onClick={buscarNotas}
><img src={imgBuscar}></img></button>
</div>
{errors.id_correo && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_correo}</p>}

        <div class="contenedor_agregarC">
        <div class="campo-registro">
           
        </div>

        {renderData(currentItems)}

        {notas.length > 0 && (
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

export default Citas;