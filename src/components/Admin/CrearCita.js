
import React, {Fragment, useState} from "react";
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {Navigate,useNavigate,useLocation,useParams} from 'react-router-dom';

import logo from '../../assets/img/unnamed.png' 



function CrearCita(props){
     
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})

    const getInitialFormState = () => {
        return {
            cita_fecha:'',
            cita_hora_inicio:'',
            cita_hora_fin:'',
            fk_id_medico:'',
        };
      };
    let navigate = useNavigate();

    const [initialForm, setInitialForm] = useState(getInitialFormState());


    
    //leer datos del formulario
    const handleChange = (e) =>{
        console.log(initialForm)
        const {name, value} = e.target;
        setInitialForm({
            ...initialForm,
            [name]:value
        })
    } 


const validateForm = (initialForm) =>{
    const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")
    const regexHora = /^(0[8-9]|1[0-2]|14|15|16):[0-5][0-9]:[0-5][0-9]$/;
    let errors = {}

    if (!initialForm.cita_fecha) {
        errors.cita_fecha = "Ingresa Fecha de la cita";
    }else if (initialForm.cita_fecha <= today) {
        errors.cita_fecha = "Estas creando una cita en una fecha pasada";
    }else if (!initialForm.cita_hora_inicio) {
        errors.cita_hora_inicio= "Ingresa La hora de inicio";
    }else if(!regexHora.test(initialForm.cita_hora_inicio)){
        errors.cita_hora_inicio = "La cita no esta en un horario laboral"

    }else  if (!initialForm.cita_hora_fin) {
        errors.cita_hora_fin= "Ingresa La hora de fin";
    }else if(!regexHora.test(initialForm.cita_hora_fin)){
        errors.cita_hora_fin = "La cita no esta en un horario laboral"

    }else if (!initialForm.fk_id_medico) {
        errors.fk_id_medico= "Ingresa El ID del Profesional";
    }
    return errors
}

function validarHoras(horaInicio, horaFin) {
    const horaInicioDate = new Date(`01/01/2000 ${horaInicio}`);
    const horaFinDate = new Date(`01/01/2000 ${horaFin}`);
  
    if (horaFinDate <= horaInicioDate) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: "La hora de fin no puede ser antes que la de inicio",
            confirmButtonText: 'Entendido'
          });
    }
  }

const handleBoton =() =>{
    setErrors(validateForm(initialForm))
    validarHoras(initialForm.cita_hora_inicio,initialForm.cita_hora_fin)
}

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(initialForm)
        
        if(Object.keys(errors).length === 0){

            clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
            clienteAxios.post('http://25.0.53.159:3000/api/citas/createCita',initialForm)
            .then(({data})=>{
               console.log(data)
                Swal.fire({
                    icon: 'success',
                    title: 'Cita Creada!',
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
            
                
                <div class="campo-registro camp-registro">
                 <input  onChange={handleChange}   className="input-registro" type="date" name="cita_fecha"  id="cita_fecha"  value={initialForm.cita_fecha}/>
                 <label class="form__label-registro" for="cita_fecha">Cita fecha</label>

                  
                            
                </div>
                {errors.cita_fecha && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.cita_fecha}</p>}
                

                <div class="campo-registro camp-registro">
                <input  onChange={handleChange}   className="input-registro" type="time" name="cita_hora_inicio"  id="cita_hora_inicio" step="1" value={initialForm.cita_hora_inicio} format="HH:mm:ss"/>
                <label class="form__label-registro" for="cita_hora_inicio">Hora de inicio</label>

                </div>
                 {errors.cita_hora_inicio && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.cita_hora_inicio}</p>}

                <div class="campo-registro camp-registro especialidad">
                <input  onChange={handleChange}   className="input-registro" type="time" name="cita_hora_fin"  id="cita_hora_fin" step="1" value={initialForm.cita_hora_fin}  format="HH:mm:ss"/>
                <label class="form__label-registro" for="cita_hora_fin">Hora de fin</label>

                 </div>
                 {errors.cita_hora_fin && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.cita_hora_fin}</p>}
                 <div class="campo-registro camp-registro especialidad">
                  <input  onChange={handleChange}   className="input-registro" type="number" placeholder="id" name="fk_id_medico" id="fk_id_medico"  value={initialForm.fk_id_medico}/>
                  <label class="form__label-registro" for="fk_id_medico">Id medico</label>


                  </div>
                   {errors.fk_id_medico && <p style={{ margin: "0" , padding:"0", color: "red",textAlign:"center"}}>{errors.fk_id_medico}</p>}
                
                </div>
                
                
            </div>
           
                <div class="div-boton-registro">
                    
                    
                <button  onClick={handleBoton} class="boton-registro " type="submit" id="button-iniciar" >Crear</button>  

                    
                    
                </div>
            </div>    
</form>
                       

                                
                </div>
                
                    
                
            
                
                
    
                
            </fieldset>
          

        </Fragment>


    
)
}

export default CrearCita;