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
import {format, render} from 'timeago.js'
import   '../../assets/css/gestionarUsuarios.css' 
import logo from '../../assets/img/unnamed.png' 
import imgBuscar from '../../assets/img/search.png' 


function Citas (props){
  
    let navigate = useNavigate();


   
    //boton Resposive
    const [btnState, setBtnState] = useState(false);
    
    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //Guardar formulario y errores de este
    const [initialForm, setInitialForm] = useState({
  
       
        rol: 'P',
        
      });
      const [busqueda, setBusqueda] = useState("");
      const [peticion, setPeticion] = useState("0");
      const [correoU, setcorreoU] = useState("");
      const { id } = useParams();
    
      const [paciente, setPaciente] = useState({
  
         nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          telefono: "",
          fecha_nacimiento: "",
          pa_genero: ""

        
      });
    
      const [medico, setMedico] = useState({
  
        nombres: '',
        apellido_paterno:'',
        apellido_materno:'',
        telefono:'',
        especialidad:'',
        area_tratamiento: '',
        
      });
    
    
 
   //Guardar datos en el state
  
   const handleChange = (e) =>{
     const {name, value} = e.target;
     setInitialForm({
       ...initialForm,
       [name]:value
      })
      console.log(initialForm.rol)
   
  }
  
  const actualizarPaciente = (e) =>{
    console.log(paciente)

    const {name, value} = e.target;
    setPaciente({
        ...paciente,
        [name]:value
    })
    
} 
const actualizarMedico = (e) =>{
  console.log(medico)

    const {name, value} = e.target;
    setMedico({
        ...medico,
        [name]:value
    })
  
  
}  
 
    
      
  
  
const editarPaciente = () => {
  clienteAxios.put('/users/updateInfo/' + correoU, paciente)
    .then(({ data }) => {
      console.log(data.msg);
      Swal.fire({
        icon: 'success',
        title: '¡Datos actualizados!',
        text: initialForm.id_correo,
        confirmButtonText: 'Entendido'
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: response.data.msg,
          confirmButtonText: 'Entendido'
        });
      }
    });
};
const editarMedico = () => {
  clienteAxios.put('/users/updateInfoMedico/' + correoU, medico)
    .then(({ data }) => {
      console.log(data.msg);
      Swal.fire({
        icon: 'success',
        title: '¡Datos actualizados!',
        text: initialForm.id_correo,
        confirmButtonText: 'Entendido'
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(({ response }) => {
      if (response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: response.data.msg,
          confirmButtonText: 'Entendido'
        });
      }
    });
};

  const buscar = (evento) => {
    setBusqueda(evento.target.value);
    setErrors(validateForm(busqueda))
  }
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
   const buscarPaciente = ()=>{

    if(Object.keys(errors).length === 0){

    if(initialForm.rol == 'P') {
      clienteAxios.get('/users/userInfo/'+busqueda)
      .then(({data})=>{
        console.log(data.nombres)
        console.log(data.nombres)
        setPaciente((prevState) => ({
            
          ...prevState,
        
          nombres: data.nombres,
          apellido_paterno: data.apellido_paterno,
          apellido_materno: data.apellido_materno,
          telefono: data.telefono,
          fecha_nacimiento: data.fecha_nacimiento,
          pa_genero: data.pa_genero

          
        }));
        setcorreoU(data.correo)
        setPeticion("1")      
        }).catch(({response})=>{

            if(response.status == 404){
                
              setcorreoU("")

                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado!',
                    text: response.data.msg,
                    confirmButtonText: 'Entendido'
                  });
            
              
              }
              setPeticion("0")      

        })
      
  
    }if(initialForm.rol == 'M'){
      clienteAxios.get('/users/userMedicoInfo/'+busqueda)
      .then(({data})=>{
        console.log(data)
        setMedico((prevState) => ({
            
          ...prevState,
        
          
          nombres: data.nombres,
          apellido_paterno:data.apellido_paterno,
          apellido_materno:data.apellido_materno,
          telefono:data.telefono,
          especialidad:data.especialidad,
          area_tratamiento: data.fk_id_area_tratamiento,
          
        }));
        setcorreoU(data.correo)
        setPeticion("2")      
        }).catch(({response})=>{

            if(response.status == 404){
                

                Swal.fire({
                    icon: 'error',
                    title: 'Paciente No Encontrado!',
                    text: response.data.msg,
                    confirmButtonText: 'Entendido'
                  });
            
              
              }
              setPeticion("0")      

        })
      
      } 

    }

  }


     
    return(
        <Fragment>
       
        <div class="contenedor_agregarC">
        <div class="campo-registro" style={{marginTop:"-20px"}}>
            <select required  onChange={handleChange} name="rol" className="selectCategoria select-custom"  id="" value={initialForm.rol} >

            <option  selected disabled  >Usuario:</option>
                <option value="P">Paciente</option>
                <option value="M">Medico</option>
                
            </select >
              
        <div className="search-bar">




        <input
        type="text"
        onChange={buscar}
        placeholder="Buscar usuario por correo"
        value={busqueda}
        >
        </input>

        <button onClick={buscarPaciente}><img src={imgBuscar}></img></button>

        </div>
        </div>
        {errors.id_correo && <p style={{ margin: "0" , padding:"0", color: "red",  textAlign:"center"}}>{errors.id_correo}</p>}
     



        {peticion === "1" ? 
  <div class="contenedor-principal-gestionarU">
    <div class="contenedor-inputs-gestionarU">
      <div class="input-gestionarU">
        <div class="label-gestionar">
          <label for="genero">Genero</label>
          <select required onChange={actualizarPaciente} name="pa_genero" className="select-gestionar " id="genero" value={paciente.pa_genero} >
            <option selected disabled value="">Genero</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select >
        </div>
        <div class="label-gestionar">
          <label for="nombres">Nombre</label>
          <input id="nombres" onChange={actualizarPaciente} name="nombres"type="text" value={paciente.nombres}></input>
        </div>
      </div>
      <div class="input-gestionarU">
        <div class="label-gestionar">
          <label for="apaterno">A.paterno</label>
          <input class="input-gestionar" id="apaterno"type="text" onChange={actualizarPaciente} name="apellido_paterno" value={paciente.apellido_paterno}></input>
        </div>
        <div class="label-gestionar">
          <label for="amaterno">A.materno </label>
          <input type="text" onChange={actualizarPaciente} id="amaterno" name="apellido_materno" value={paciente.apellido_materno}></input>
        </div>
      </div>
      <div class="input-gestionarU">
        <div class="label-gestionar">
          <label for="nacimiento">Nacimiento</label>
          <input type="date" onChange={actualizarPaciente} id="nacimiento" name="fecha_nacimiento" value={paciente.fecha_nacimiento} ></input>
        </div>
        <div class="label-gestionar">
          <label for="telefono" >Telefono</label>
          <input type="tel" onChange={actualizarPaciente} name="telefono" id="telefono" value={paciente.telefono} ></input>
        </div>
      </div>
    </div>
    <div class="contenedor-botones-gestionarU">
      <p>{paciente.correo}</p>
      <button className="gestionar-color" onClick={()=> editarPaciente()}>Editar</button> 
    </div>
  </div>
  :
  peticion =="2" && 
  <div class="contenedor-principal-gestionarU">
  <div class="contenedor-inputs-gestionarU">
    <div class="input-gestionarU">
      <div class="label-gestionar">
      <label for="especialidad">Especialidad</label>
        <input onChange={actualizarMedico} id ="especialidad"name="especialidad" value={medico.especialidad}></input>
      </div>
      <div class="label-gestionar">
        <label for="nombres">Nombres</label>
        <input id="nombres" onChange={actualizarMedico} name="nombres" type="text" value={medico.nombres}></input>
      </div>
    </div>
    <div class="input-gestionarU">
      <div class="label-gestionar">
        <label for="apaterno">A.paterno</label>
        <input class="input-gestionar" onChange={actualizarMedico} id="apaterno"name="apellido_paterno" type="text" value={medico.apellido_paterno}></input>
      </div>
      <div class="label-gestionar">
        <label for="amaterno">A.materno </label>
        <input type="text" onChange={actualizarMedico} id="amaterno" name="apellido_materno" value={medico.apellido_materno}></input>
      </div>
    </div>
    <div class="input-gestionarU">
      <div class="label-gestionar">
      <label for="area">Area</label>
      <select required  onChange={actualizarMedico} name="area_tratamiento " className="select-gestionar "  id="area" value={medico.area_tratamiento} >
        <option selected disabled value="">Area</option>
                    <option value="1">Fisioterapia</option>
                    <option value="2">SPA</option>
                    <option value="3">Aparatologia</option>

        </select >
      </div>
      <div class="label-gestionar">
        <label for="telefono" >Telefono</label>
        <input  onChange={actualizarMedico} name="telefono" id="telefono" type="tel"value={medico.telefono} ></input>
      </div>
    </div>
  </div>
  <div class="contenedor-botones-gestionarU">
  <button className="gestionar-color" onClick={()=> editarMedico()}>Editar</button> 

  </div>
</div> 
} 





        </div>
        
      








         
      


        </Fragment>
    )
}

export default Citas;