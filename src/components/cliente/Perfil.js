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


function Perfil (){
  

    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
    const [initialForm, setInitialForm] = useState({
  
        nombres: '',
        apellido_paterno:'',
        apellido_materno:'',
        telefono:'',
        fecha_nacimiento:'',
        pa_genero: '',
        
      });
      const { id } = useParams();
    
    //Hacer peticion de los datos del paciente para guardarla en los inputs
      useEffect(() => {

        clienteAxios.get('http://25.0.53.159:3000/api/users/userInfo/'+id)
        .then(({data})=>{
           console.log(data)
          
           setInitialForm((prevState) => ({
            
            ...prevState,
          
            nombres: data.nombres,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            telefono: data.telefono,
            fecha_nacimiento: data.fecha_nacimiento,
            pa_genero: data.pa_genero
  
  
          }));
                
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
   const handleChange = (e) =>{
     
    const {name, value} = e.target;
    setInitialForm({
        ...initialForm,
        [name]:value
    })
    
} 
    const validationsForm = (initialForm) =>{
        let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        let regexTel = /^[0-9]{1,15}$/;
        const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")

        let errors = {}

    if(initialForm.pa_genero ==="NO") {
        errors.pa_genero = "Selecciona un genero"
    }else if(!initialForm.nombres.trim()){
        errors.nombres = "El campo 'Nombres' es requerido";
    }else if(!regexNombres.test(initialForm.nombres.trim())){
        errors.nombres = "El campo 'Nombres' no es valido"
    }else if(!initialForm.apellido_paterno.trim()){
        errors.apellido_paterno = "El campo 'Apellido Paterno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_paterno.trim())){
        errors.apellido_paterno = "El apellido que ingresas no es valido"
    }else if(!initialForm.apellido_materno.trim()){
         errors.apellido_materno = "El campo 'Apellido Materno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_materno.trim())){
         errors.apellido_materno = "El apellido que ingresas no es valido"
    }else if (initialForm.fecha_nacimiento >= today) {
        errors.fecha_nacimiento = "Fecha de nacimiento invalida"
    }else if(!initialForm.fecha_nacimiento) {
        errors.fecha_nacimiento = "Ingresa Fecha de nacimiento"
    }else if(!initialForm.telefono.trim()){
        errors.telefono = "El campo 'Telefono' es requerido"
   } else if(!regexTel.test(initialForm.telefono.trim())){
    errors.telefono = "El telefono ingresado no es valido"
    }
    return errors

    
}
const validateForm = (initialForm) =>{
    
        let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        let regexTel = /^[0-9]{1,15}$/;
        const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")
        
        let errors = {}

  
    if(initialForm.pa_genero==="") {
    errors.pa_genero = "Selecciona un genero"
    }
    if(!regexNombres.test(initialForm.nombres.trim())){
    errors.nombres = "El campo 'Nombres' no es valido"
}

    if(!initialForm.nombres.trim()){
    errors.nombres = "El campo 'Nombres' es requerido";
    }
    if(!regexNombres.test(initialForm.apellido_paterno.trim())){
    errors.apellido_paterno = "El apellido que ingresas no es valido"
    }

    if(!initialForm.apellido_paterno.trim()){
    errors.apellido_paterno = "El campo 'Apellido Paterno' es requerido"
    }
    if(!regexNombres.test(initialForm.apellido_materno.trim())){
    errors.apellido_materno = "El apellido que ingresas no es valido"
    }

    if(!initialForm.apellido_materno.trim()){
    errors.apellido_materno = "El campo 'Apellido Materno' es requerido"
    }
    if (initialForm.fecha_nacimiento >= today) {
    errors.fecha_nacimiento = "Fecha de nacimiento invalida"
    }
    if (!initialForm.fecha_nacimiento) {
    errors.fecha_nacimiento = "Ingresa Fecha de nacimiento"
    }
    if(!regexTel.test(initialForm.telefono)){
    errors.telefono = "El telefono ingresado no es valido"
    }
    if(!initialForm.telefono){
        errors.telefono = "El campo 'Telefono' es requerido"
    }
    return errors
    }
    
    const handleBoton =() =>{
        setErrors(validateForm(initialForm))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        
        if(Object.keys(errors).length === 0){
            clienteAxios.put('http://25.0.53.159:3000/api/users/updateInfo/' + id , initialForm)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Datos actualizados!',
                    text: initialForm.id_correo,
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
        <legend class="legent-nombre">Actualizar Datos</legend>
        
        <div class="contenido-registro">
            
            
<form  onSubmit={handleSubmit} 
class="formulario-registro" >

<div class="flex1">
    
    <div class="contenedor-flex-registro">
        
        <div class="campoflex-registro">
            
                
                <div class="campo-registro">
                        

                        <select required  onChange={handleChange} name="pa_genero" className="input-registro input-tipoid-registro"  id="" value={initialForm.pa_genero} >

                            <option  selected disabled  value="">Genero</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            
                        </select >
                                                        
                            
                </div>
                            {errors.pa_genero && <p style={{ margin: "0" , padding:"0", color: "red", textAlign:"center"}}>{errors.pa_genero}</p>}      
                
                
                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}  type="text" name="nombres" className="input-registro" id="nombres" value={initialForm.nombres} placeholder="Nombres" required/>
                    <label class="form__label-registro" for="nombres">Nombres</label>

                </div>
                     {errors.nombres && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.nombres}</p>}


                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}  type="text" name="apellido_paterno" className="input-registro" id="apellidoPaterno" value={initialForm.apellido_paterno} placeholder="Apellido Paterno"  required/> 
                    <label class="form__label-registro" for="apellidoPaterno">Apellido Paterno</label>
                </div>
                    {errors.apellido_paterno && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.apellido_paterno}</p>}
  

             
                
                </div>
                
                
                <div class="campoflex-registro ">
                    
                <div class="campo-registro camp-registro">
                          
             <input  onChange={handleChange}  type="text" name="apellido_materno" className="input-registro" id="apellidoMaterno" value={initialForm.apellido_materno}  required/>
                    <label class="form__label-registro" for="apellidoMaterno">Apellido Materno</label>
                
                </div>
                {errors.apellido_materno && <p style={{ margin: "0" , padding:"0", color: "red" }}>{errors.apellido_materno}</p>}

                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}  type="date" name="fecha_nacimiento" className="input-registro" id="fechaNacimiento" value={initialForm.fecha_nacimiento} />
                    <label class="form__label-registro" for="fechaNacimiento">Fecha de nacimiento</label>
                 </div>
                    
                {errors.fecha_nacimiento && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.fecha_nacimiento}</p>}
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange} name="telefono" type="tel" className="input-registro" id="telefono" value={initialForm.telefono}  required/>
                    <label class="form__label-registro" for="telefono">telefono</label>
                </div>
                {errors.telefono && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.telefono}</p>}

                </div>
            </div>
           
                <div class="div-boton-registro">
                    
                    
                    
                    <button  onClick={handleBoton} class="boton-registro " type="submit" id="button-iniciar" >Actualizar</button>  
                    
                </div>
            </div>    
</form>
               
                </div>        
            </fieldset>

        </Fragment>
    )
}

export default Perfil;