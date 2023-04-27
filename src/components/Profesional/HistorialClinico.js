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
//  import  '../../assets/css/home.css';
import clienteAxios from  '../../config/axios';
import   '../../assets/css/perfilUsuario.css' 
import imgBuscar from '../../assets/img/search.png' 

function Perfil (props){
  

    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    
    const [busqueda, setBusqueda] = useState("");

    //Guardar formulario y errores de este

    const getInitialHistoria = () =>{
        return{
            fk_id_paciente: '',
            hist_alergias:'',
            hist_cirugias_previas:'',
            hist_enfermedades_cronicas:'',
            hist_lesiones_previas:'',
            id_historia_medica: ''
            
        }
    }
    const [historia, setHistoria] = useState(getInitialHistoria);
      const { id } = useParams();

      const buscar = (evento) => {
        setBusqueda(evento.target.value);
        setErrors(validateForm(busqueda))

        console.log(busqueda)
      }    
    //Hacer peticion de los datos del paciente para guardarla en los inputs
     
    




    
   //Guardar datos en el state
   const handleChange = (e) =>{
       const {name, value} = e.target;
       setHistoria({
           ...historia,
           [name]:value
        })
        console.log(historia)
    
} 


const validateForm = (busqueda) =>{
    let regexNumero = /^[0-9]+$/; 

    if(!busqueda.trim()){
    errors.errorB = "Busca un usuario por su ID";
    }else if(!regexNumero.test(busqueda.trim())){
      errors.errorB = "El campo  no tiene un formato valido"
    }else if(regexNumero.test(busqueda.trim()) && busqueda.trim()){
      errors.errorB = ""
    }
      return errors
    

    }
    
    
    
    const buscarHistoria = () => {
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
        clienteAxios.get("/consultasMedicas/historiaMedica/consultar/" + busqueda)
          .then(({ data }) => {
            console.log(data);
            setHistoria((prevState) => ({
              ...prevState,
              
                fk_id_paciente: data.fk_id_paciente,
                hist_alergias:data.hist_alergias,
                hist_cirugias_previas:data.hist_cirugias_previas,
                hist_enfermedades_cronicas:data.hist_enfermedades_cronicas,
                hist_lesiones_previas:data.hist_lesiones_previas,
                id_historia_medica: data.id_historia_medica,
            }));
          })
          .catch(({ response }) => {
            if (response.status == 404) {
             Swal.fire({
                icon: "error",
                title: "Paciente No Encontrado!",
                text: response.data.msg,
                confirmButtonText: "Entendido",
              });
              setHistoria(getInitialHistoria());

            }
          });
      };


      let nuevoHistorial = {
        alergias:historia.hist_alergias,
        enfermades:historia.hist_enfermedades_cronicas,
        lesiones:historia.hist_lesiones_previas,
        cirugias:historia.hist_cirugias_previas
      }
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        
            clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
            clienteAxios.put('/consultasMedicas/historiaMedica/actualizar/' + historia.fk_id_paciente , nuevoHistorial)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Historial actualizado!',
                    text: data.msg,
                    confirmButtonText: 'Entendido'
                  });
                setHistoria(getInitialHistoria());
                setBusqueda("")
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
 

   
 

    
    return(
        <Fragment>

<div className="search-bar">




<input
type="text"
onChange={buscar}
placeholder="buscar paciente por ID"
value={busqueda}
>
</input>

<button
 onClick={buscarHistoria}
><img src={imgBuscar}></img></button>
</div>
{errors.errorB && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.errorB}</p>}
   
        

            {historia.id_historia_medica !== "" ? (
  <fieldset>
  <legend class="legent-nombre"></legend>
  
  <div class="contenido-registro">
      
      
<form 
onSubmit={handleSubmit} 
class="formulario-registro" >

<div class="flex1">

<div class="contenedor-flex-registro">
  
  <div class="campoflex-registro">
      
         
          <div class="campo-registro camp-registro">
              <input  onChange={handleChange}  type="text" name="hist_alergias" className="input-registro" id="hist_alergias" value={historia.hist_alergias} placeholder="Alergias" required/>

          </div>
               {errors.nombres && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.nombres}</p>}


          <div class="campo-registro camp-registro">
          <input  onChange={handleChange}  type="text" name="hist_cirugias_previas" className="input-registro" id="apellidoPaterno" value={historia.hist_cirugias_previas} placeholder="cirugias Previas"  required/> 
          </div>
              {errors.apellido_paterno && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.apellido_paterno}</p>}


       
          
          </div>
          
          
          <div class="campoflex-registro ">
              
          <div class="campo-registro camp-registro">
                    
       <input  onChange={handleChange}  type="text" name="hist_enfermedades_cronicas" className="input-registro"  value={historia.hist_enfermedades_cronicas}  required/>
          
          </div>
          {errors.apellido_materno && <p style={{ margin: "0" , padding:"0", color: "red" }}>{errors.apellido_materno}</p>}

          
          <div class="campo-registro camp-registro">
          <input  onChange={handleChange}  type="text" name="hist_lesiones_previas" className="input-registro" id="fechaNacimiento" value={historia.hist_lesiones_previas} />
           </div>
              
          {errors.fecha_nacimiento && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.fecha_nacimiento}</p>}
       
          </div>
      </div>
     
          <div class="div-boton-registro">
              
              
              
              <button
               class="boton-registro " type="submit" id="button-iniciar" >Actualizar</button>  
              
          </div>
      </div>    



</form>
         
          </div>        
      </fieldset>

) : null}
        </Fragment>
    )
}

export default Perfil;