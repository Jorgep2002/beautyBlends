
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
            sintomas_consulta:'',
            evaluacion_fisica:'',
            plan_tratamiento:'',
            fecha:'',
            fk_id_medico:'',
            fk_id_historia_medica:''
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
       console.log(initialForm)
    } 



    const validateForm = (initialForm) =>{
        let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        let regexNumero = /^[0-9]+$/; 

        let errors = {}
    
        if(!initialForm.sintomas_consulta){
            errors.sintomas_consulta = "El campo 'Sintomas' es requerido ";
        }else if(!regexNombres.test(initialForm.sintomas_consulta)){
                errors.sintomas_consulta = "El campo 'Sintomas' no es valido ";
        }else if(!initialForm.evaluacion_fisica){
            errors.evaluacion_fisica = "El campo 'Evaluacion Fisica' es requerido ";
        }else if(!regexNombres.test(initialForm.evaluacion_fisica)){
                errors.evaluacion_fisica = "El campo 'Evaluacion Fisica' no es valido ";
        }else if(!initialForm.fecha){
            errors.fecha = "El campo 'Fecha' es requerido ";
        }else if(!initialForm.fk_id_medico){
            errors.fk_id_medico = "El campo 'Id medico' es requerido ";
        }else if(!regexNumero.test(initialForm.fk_id_medico)){
                errors.fk_id_medico = "El campo 'Id medico' no es valido ";
        }else if(!initialForm.fk_id_historia_medica){
            errors.fk_id_historia_medica = "El campo 'Historia_medica' es requerido ";
        }else if(!regexNumero.test(initialForm.fk_id_historia_medica)){
                errors.cirugias = "El campo 'Historia medica' no es valido ";
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
            clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
            clienteAxios.post('http://25.0.53.159:3000/api/consultasMedicas/notasConsulta/Create',initialForm)
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

                if(response.status === 500){

                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text:response.data.msg,
                        confirmButtonText: 'Entendido'
                      });
                      setInitialForm(getInitialFormState());  

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
            
             
                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}   className="input-registro" type="text" name="sintomas_consulta"  id="me_nombres" placeholder="Sintomas" value={initialForm.sintomas_consulta}/>


                </div>
                     {errors.sintomas_consulta && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.sintomas_consulta}</p>}

                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}   className="input-registro" type="text" name="evaluacion_fisica" placeholder="Evaluacion Fisica" id="me_apellido_paterno"  value={initialForm.evaluacion_fisica}/>

                </div>
                {errors.evaluacion_fisica && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.evaluacion_fisica}</p>}

                <div class="campo-registro camp-registro especialidad">
                <input  onChange={handleChange}  className="input-registro" name="plan_tratamiento" type="text" placeholder="Plan de tratamiento" id="me_especialidad" value={initialForm.plan_tratamiento}  />
                 </div>
                 {errors.plan_tratamiento && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.plan_tratamiento}</p>}
                 <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="date" name="fecha"  id="contrasenia"  value={initialForm.fecha} placeholder="Fecha"/>

                  </div>
                {errors.fecha && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.fecha}</p>}
                <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="text" name="fk_id_medico"  id="contrasenia"  value={initialForm.fk_id_medico} placeholder="Id Medico"/>

                  </div>
                {errors.fk_id_medico && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.fk_id_medico}</p>}
                <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="text" name="fk_id_historia_medica"  id="contrasenia"  value={initialForm.fk_id_historia_medica} placeholder="Historia Medica"/>

                  </div>
                {errors.fk_id_historia_medica && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.fk_id_historia_medica}</p>}
                
        </div>
                
                
                
              
        </div>
           
                <div class="div-boton-registro">
                    
                    
                     <button  onClick={handleBoton} class="boton-registro " type="submit" id="button-iniciar" >Crear Nota</button>  

                    
                    
                </div>
            </div>    
</form>
                       

                                
                </div>
                
                    
                
            
                
                
    
                
            </fieldset>
          

        </Fragment>
)
}

export default AdminAProfesional;