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
import curriculum from '../../assets/img/curriculum.png' 
import   '../../assets/css/perfilUsuario.css' 
import logo from '../../assets/img/unnamed.png' 

function Contrasenia (){
  

    
    const [initialForm, setInitialForm] = useState({
  
        contrasenia: '',
        repetirContrasenia:'',
        
      });
      const { id } = useParams();
      const[errors,setErrors] = useState({});
    //Guardar formulario y errores de este
    
    
    //Hacer peticion de los datos del paciente para guardarla en los inputs
      
    




    
    
   //Guardar datos en el state
   const handleChange = (e) =>{
     
    const {name, value} = e.target;
    setInitialForm({
        ...initialForm,
        [name]:value
    })
    
} 




const validateForm = (initialForm) =>{
    
       
        let errors = {}

  
   
    if(!initialForm.contrasenia.trim()){
    errors.contrasenia = "El campo 'contraseña' es requerido";
    }
   
    
    if(!initialForm.repetirContrasenia.trim()){
        errors.repetirContrasenia = "El campo  'repetir contraseña' es requerido";
        }
    
    if(initialForm.contrasenia !== initialForm.repetirContrasenia){
        errors.contrasenias = "Las contraseñas deben ser iguales";
    }
    return errors
    }
    
    const handleBoton =() =>{
        setErrors(validateForm(initialForm))
    }

    const handleSubmit = (e) =>{
        
        e.preventDefault();
        
        if(Object.keys(errors).length === 0){
    //            delete initialForm.repetirContrasenia;
            clienteAxios.put('/users/updatePassword/' + id , initialForm)
            .then(({data})=>{
               console.log(data.msg)
                 Swal.fire({
                     icon: 'success',
                     title: '¡Datos actualizados!',
                     text: data.msg,
                     confirmButtonText: 'Entendido'
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
        
        }else{
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Verifica los campos',
                confirmButtonText: 'Aceptar'
              });
        }
        
    }  

    return(
        <Fragment>


        <fieldset>
        <legend class="legent-nombre">Cambiar contraseña</legend>
        
        <div class="contenido-registro">
            
            
<form  onSubmit={handleSubmit} 
class="formulario-registro" >

<div class="flex1">
    
    <div class="contenedor-flex-registro">
        
        <div class="campoflex-registro">
            
                
                <div class="campo-registro camp-registro">
                        <input onChange={handleChange} name="contrasenia" type="password" className="input-registro" id="contrasenia" value={initialForm.contrasenia}/>
                        <label className="form__label-registro" for="contrasenia">Contraseña</label>
                    </div>
                    {errors.contrasenia && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.contrasenia}</p>}

                    <div className="campo-registro camp-registro">
                        <input onChange={handleChange} name="repetirContrasenia" type="password" className="input-registro" id="repetirContrasenia" value={initialForm.repetirContrasenia}/>
                        <label className="form__label-registro" for="repetirContrasenia">Repetir Contraseña</label>
                    </div>
                    {errors.repetirContrasenia && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.repetirContrasenia}</p>}
                    {errors.contrasenias && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.contrasenias}</p>}

    <button  onClick={handleBoton} class="boton-registro " type="submit" id="button-iniciar" >Actualizar</button>  
                    
                </div>
            </div>   
        </div>    
</form>
                       

                                
                </div>
                
                    
                
            
                
                
    
                
            </fieldset>
          




</Fragment>            
            
                       

    
    )
}

export default Contrasenia;