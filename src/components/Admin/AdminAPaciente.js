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
import logo from '../../assets/img/unnamed.png' 


function AdminAPaciente (props){
  
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
    const getInitialFormState = () => {
        return {
            id_correo:'',
            contrasenia:'',
            id_paciente:'',
            nombres: '',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            fecha_nacimiento:'',
            genero: '',
        };
      };
    const [initialForm, setInitialForm] = useState(getInitialFormState());
    
    const { id } = useParams();

    let navigate = useNavigate();

    
   //Guardar datos en el state
   const handleChange = (e) =>{
     
    const {name, value} = e.target;
    setInitialForm({
        ...initialForm,
        [name]:value
    },
    console.log(initialForm)
    )
    
} 

const validateForm = (initialForm) =>{
    
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    let regexTel = /^[0-9]{1,15}$/;

    const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")
    
        let errors = {}
    if(!initialForm.nombres.trim()){
        errors.nombres = "El campo 'Nombres' es requerido";

    }else if(!initialForm.contrasenia.trim()){
        errors.contrasenia = "El campo 'contraseña' es requerido";
    }else  if(!initialForm.id_correo.trim()){
        errors.id_correo = "El campo 'Email' es requerido";
    }else if(!regexEmail.test(initialForm.id_correo.trim())){
        errors.id_correo = "El campo 'Email'  no tiene un formato valido"
    }else if(initialForm.pa_genero==="") {
    errors.pa_genero = "Selecciona un genero"
    }else if(!regexNombres.test(initialForm.nombres.trim())){
    errors.nombres = "El campo 'Nombres' no es valido"
    }else if(!initialForm.nombres.trim()){
    errors.nombres = "El campo 'Nombres' es requerido";
    }else if(!initialForm.apellido_paterno.trim()){
        errors.apellido_paterno = "El campo 'Apellido Paterno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_paterno.trim())){
    errors.apellido_paterno = "El apellido que ingresas no es valido"
    }else  if(!initialForm.apellido_materno.trim()){
        errors.apellido_materno = "El campo 'Apellido Materno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_materno.trim())){
    errors.apellido_materno = "El apellido que ingresas no es valido"
    }else if (initialForm.fecha_nacimiento >= today) {
    errors.fecha_nacimiento = "Fecha de nacimiento invalida"
    }else if (!initialForm.fecha_nacimiento) {
    errors.fecha_nacimiento = "Ingresa Fecha de nacimiento"
    }else  if(!initialForm.telefono){
        errors.telefono = "El campo 'Telefono' es requerido"
    }else if(!regexTel.test(initialForm.telefono)){
    errors.telefono = "El telefono ingresado no es valido"
    }else if(!initialForm.id_paciente){
        errors.id_paciente = "Ingresa un ID"
    }
    return errors
    }
    const handleBlur = (e) =>{
    // handleChange(e);
    // //Codigo para validard datos del formulario
    // setErrors(validateForm(initialForm))
   

    };
    const handleBoton =() =>{
        setErrors(validateForm(initialForm))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(initialForm)

        
        if(Object.keys(errors).length === 0){
            clienteAxios.post('http://25.0.53.159:3000/api/users/createPaciente/',initialForm)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Paciente Creado!',
                    text: data.msg,
                    confirmButtonText: 'Entendido'
                  });
                  setInitialForm(getInitialFormState());  

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
        <legend class="legent-nombre"></legend>
        
        <div class="contenido-registro">
            
            
<form  onSubmit={handleSubmit} 
class="formulario-registro" >

<div class="flex1">
    
    <div class="contenedor-flex-registro">
        
        <div class="campoflex-registro">
            
                
                <div class="campo-registro">
                        

                        <select required  onChange={handleChange} name="genero" className="input-registro input-tipoid-registro"  id="" value={initialForm.pa_genero} >

                            <option  selected disabled  value="">Genero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            </select >
                      

                </div>                             
                            
                
                            {errors.pa_genero && <p style={{ margin: "0" , padding:"0", color: "red", textAlign:"center"}}>{errors.pa_genero}</p>}      
                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}  type="number" name="id_paciente" className="input-registro" id="id_paciente" value={initialForm.id_paciente} placeholder="id" required/>

                </div>
                {errors.id_paciente && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_paciente}</p>}

                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}  type="text" name="id_correo" className="input-registro" id="" value={initialForm.id_correo} placeholder="correo" required/>

                </div>
                {errors.id_correo && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_correo}</p>}

                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}  type="text" name="nombres" className="input-registro" id="nombres" value={initialForm.nombres} placeholder="Nombres" required/>

                </div>
                     {errors.nombres && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.nombres}</p>}


                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}  type="text" name="apellido_paterno" className="input-registro"  id="apellidoPaterno" value={initialForm.apellido_paterno} placeholder="Apellido Paterno"  required/> 
                </div>
                    {errors.apellido_paterno && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.apellido_paterno}</p>}
  

             
                
                </div>
                
                
                <div class="campoflex-registro ">
                    <div class="campo-registro camp-registro">
                          
             <input  onChange={handleChange}  type="password" name="contrasenia" placeholder="Contraseña" className="input-registro" id="apellidoMaterno" value={initialForm.contrasenia}  required/>
                
                </div>
                {errors.contrasenia && <p style={{ margin: "0" , padding:"0", color: "red" }}>{errors.contrasenia}</p>}
                <div class="campo-registro camp-registro">
     
             <input  onChange={handleChange}  type="text" name="apellido_materno" placeholder="Apellido Materno" className="input-registro" id="apellidoMaterno" value={initialForm.apellido_materno}  required/>
                
                </div>
                {errors.apellido_materno && <p style={{ margin: "0" , padding:"0", color: "red" }}>{errors.apellido_materno}</p>}

                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}  type="date" name="fecha_nacimiento" className="input-registro" id="fechaNacimiento" value={initialForm.fecha_nacimiento} />
                 </div>
                    
                {errors.fecha_nacimiento && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.fecha_nacimiento}</p>}
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange} name="telefono" placeholder="Telefono" type="number" className="input-registro" id="telefono" value={initialForm.telefono}  required/>
                </div>
                {errors.telefono && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.telefono}</p>}

                </div>
            </div>
           
                <div class="div-boton-registro">
                    
                    
                    
                    <button  onClick={handleBoton} class="boton-registro " type="submit" id="button-iniciar" >Registrar</button>  
                    
                </div>
            </div>    
</form>
                       

                                
                </div>
                
                    
                
            
                
                
    
                
            </fieldset>



        </Fragment>
    )
}

export default AdminAPaciente;