
import React, {Fragment, useState} from "react";
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {Navigate,useNavigate,useLocation,useParams} from 'react-router-dom';
import logo from '../../assets/img/unnamed.png' 



function AdminAProfesional(props){
       
    //boton Resposive
    const [btnState, setBtnState] = useState(false);
    
    const[errors,setErrors] = useState({})


    const getInitialFormState = () => {
        return {
            id_correo:'@beautyblend.com',
            contrasenia:'',
            id_medico:'',
            me_nombres:'',
            me_apellido_paterno:'',
            me_apellido_materno:'',
            me_telefono:'',
            me_especialidad: '',
            fk_id_area_tratamiento:'',
        };
      };
    const [initialForm, setInitialForm] = useState(getInitialFormState());

   
    //leer datos del formulario
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInitialForm({
            ...initialForm,
            [name]:value
        })
       
    } 


const validateForm = (initialForm) =>{
    let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    let regexEmail = /[a-zA-Z0-9._%+-]+@beautyblend\.com$/;
    let regexTel = /^[0-9]{1,15}$/;
    
    let errors = {}

     if(!initialForm.id_correo.trim()){
        errors.id_correo = "El campo 'Correo' es requerido";
    }else if(!regexEmail.test(initialForm.id_correo)){
            errors.id_correo = "El campo 'Correo' no pertenece a la empresa ";
    }else if(!initialForm.contrasenia.trim()){
        errors.contrasenia = "El campo 'Contraseña' es requerido";
    }else if(!initialForm.id_medico.trim()){
        errors.id_medico = "El campo 'ID' es requerido";
    }else  if(!initialForm.me_nombres.trim()){
        errors.me_nombres = "El campo 'Nombres' es requerido"
    }else if(!regexNombres.test(initialForm.me_nombres.trim())){
        errors.me_nombres = "Los Nombres que ingresas no son validos"
    }else  if(!initialForm.me_apellido_materno.trim()){
        errors.me_apellido_materno = "El campo 'Apellido Materno' es requerido"
    }else if(!regexNombres.test(initialForm.me_apellido_materno.trim())){
        errors.me_apellido_materno = "El Apellido materno que ingresas es invalido"
    }else if(!initialForm.me_apellido_paterno.trim()){
        errors.me_apellido_paterno = "El campo 'Apellido Paterno' es requerido"
    }else if(!regexNombres.test(initialForm.me_apellido_paterno.trim())){
        errors.me_apellido_paterno = "El Apellido paterno que ingresas no es valido"
    }else if(!initialForm.me_telefono.trim()){
        errors.me_telefono = "El campo 'Telefono' es requerido"
    }else if(!regexTel.test(initialForm.me_telefono.trim())){
        errors.me_telefono = "El telefono ingresado no es valido"
    }else  if(!initialForm.me_especialidad.trim()) {
        errors.me_especialidad = "Selecciona una especialidad"
    }else if(initialForm.fk_id_area_tratamiento==="") {
        errors.fk_id_area_tratamiento = "Selecciona una area de tratamiento"
    }
    return errors
}

 

const handleBoton =() =>{
    setErrors(validateForm(initialForm))
}

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(initialForm)
        
        if(Object.keys(errors).length === 0){
            
            clienteAxios.post('http://25.0.53.159:3000/api/users/createMedico',initialForm)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Excelente!',
                    text: data.msg,
                    confirmButtonText: '¡Listo!'
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
                        

                <select required  onChange={handleChange} name="fk_id_area_tratamiento" className="input-registro input-tipoid-registro"  id="" value={initialForm.fk_id_area_tratamiento} >
                
                    <option  selected disabled  value="">Area de Tratamiento</option>
                    <option value="1">Fisioterapia</option>
                    <option value="2">SPA</option>
                    <option value="3">Aparatologia</option>
                </select >
                            
                                                        
                            
                </div>
                {errors.fk_id_area_tratamiento && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.fk_id_area_tratamiento}</p>}
                
                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}   className="input-registro" type="text" name="me_nombres"  id="me_nombres" placeholder="Nombres" value={initialForm.me_nombres}/>


                </div>
                     {errors.me_nombres && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.me_nombres}</p>}

                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}   className="input-registro" type="text" name="me_apellido_paterno" placeholder="apellido paterno" id="me_apellido_paterno"  value={initialForm.me_apellido_paterno}/>

                </div>
                {errors.me_apellido_paterno && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.me_apellido_paterno}</p>}

                <div class="campo-registro camp-registro especialidad">
                <input  onChange={handleChange}  className="input-registro" name="me_especialidad" type="text" placeholder="especialidad" id="me_especialidad" value={initialForm.me_especialidad}  />
                 </div>
                 {errors.me_especialidad && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.me_especialidad}</p>}
                 <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="password" name="contrasenia"  id="contrasenia"  value={initialForm.contrasenia} placeholder="contraseña"/>

                  </div>
                {errors.contrasenia && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.contrasenia}</p>}
                
                </div>
                
                
                
                <div class="campoflex-registro ">
                <div class="campo-registro camp-registro">

                <input  onChange={handleChange}  placeholder="Correo"  className="input-registro" type="text" name="id_correo"  id="id_correo"  value={initialForm.id_correo}/>

                </div>
                {errors.id_correo && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_correo}</p>}

                <div class="campo-registro camp-registro">
                          
                <input  onChange={handleChange}   className="input-registro" type="text" name="me_apellido_materno"  id="me_apellido_materno" placeholder="apellido matero" value={initialForm.me_apellido_materno}/>
                
                </div>
                {errors.me_apellido_materno && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.me_apellido_materno}</p>}

                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}   className="input-registro" type="number" style={{WebkitAppearance: "none"}} name="id_medico"  placeholder="ID medico" id="id_medico"  value={initialForm.id_medico}/>
                 </div>
                 {errors.id_medico && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_medico}</p>}
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}  className="input-registro" name="me_telefono" type="number" id="me_telefono" value={initialForm.me_telefono} placeholder="telefono" />
                </div>
                {errors.me_telefono && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.me_telefono}</p>}

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

export default AdminAProfesional;