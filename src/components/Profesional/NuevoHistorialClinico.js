
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
            alergias:'',
            enfermades:'',
            lesiones:'',
            cirugias:'',
            fk_id_paciente:''
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
    let regexNumero = /^[0-9]+$/; 
    let errors = {}

    if(!initialForm.alergias){
        errors.alergias = "El campo 'Alergias' es requerido ";
    }else if(!regexNombres.test(initialForm.alergias)){
            errors.alergias = "El campo 'alergias' no es valido ";
    }else if(!initialForm.enfermades){
        errors.enfermades = "El campo 'enfermedades' es requerido ";
    }else if(!regexNombres.test(initialForm.enfermades)){
            errors.enfermades = "El campo 'enfermedades' no es valido ";
    }else if(!initialForm.lesiones){
        errors.lesiones = "El campo 'Lesiones' es requerido ";
    }else if(!regexNombres.test(initialForm.lesiones)){
            errors.lesiones = "El campo 'Lesiones' no es valido ";
    }else if(!initialForm.cirugias){
        errors.cirugias = "El campo 'Cirugias' es requerido ";
    }else if(!regexNombres.test(initialForm.cirugias)){
            errors.cirugias = "El campo 'Cirugiasd' no es valido ";
    }else if(!initialForm.fk_id_paciente){
        errors.fk_id_paciente = "El campo 'Id paciente' es requerido ";
    }else if(!regexNumero.test(initialForm.fk_id_paciente)){
            errors.fk_id_paciente = "El campo 'Id paciente' no es valido ";
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
            clienteAxios.post('http://25.0.53.159:3000/api/consultasMedicas/historiaMedica/Create/',initialForm)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Excelente!',
                    text: "Historia clinica creada"+data.msg,
                    confirmButtonText: '¡Listo!'
                  });
                  setInitialForm(getInitialFormState());  
                    
            }).catch(({response})=>{

                if(response.status === 400){

                    setInitialForm(getInitialFormState());  
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: "El usuario no existe o "+response.data.msg,
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
            
             
                
                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}   className="input-registro" type="text" name="alergias"  id="me_nombres" placeholder="Alergias" value={initialForm.alergias}/>


                </div>
                     {errors.alergias && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.alergias}</p>}

                <div class="campo-registro camp-registro">
                    <input  onChange={handleChange}   className="input-registro" type="text" name="enfermades" placeholder="Enfermedades" id="me_apellido_paterno"  value={initialForm.enfermades}/>

                </div>
                {errors.enfermades && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.enfermades}</p>}

                <div class="campo-registro camp-registro especialidad">
                <input  onChange={handleChange}  className="input-registro" name="lesiones" type="text" placeholder="Lesiones" id="me_especialidad" value={initialForm.lesiones}  />
                 </div>
                 {errors.lesiones && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.lesiones}</p>}
                 <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="text" name="cirugias"  id="contrasenia"  value={initialForm.cirugias} placeholder="Cirugias"/>

                  </div>
                {errors.cirugias && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.cirugias}</p>}
                <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="text" name="fk_id_paciente"  id="contrasenia"  value={initialForm.fk_id_paciente} placeholder="Paciente ID"/>

                  </div>
                {errors.fk_id_paciente && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.fk_id_paciente}</p>}
                
        </div>
                
                
                
              
        </div>
           
                <div class="div-boton-registro">
                    
                    
                     <button onClick={handleBoton}  class="boton-registro " type="submit" id="button-iniciar" >Crear Historial</button>  

                    
                    
                </div>
            </div>    
</form>
                       

                                
                </div>
                
                    
                
            
                
                
    
                
            </fieldset>
          

        </Fragment>
)
}

export default AdminAProfesional;