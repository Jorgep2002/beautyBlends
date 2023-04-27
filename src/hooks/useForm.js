import {useState} from "react"
import Swal from 'sweetalert2';
import {useNavigate,useLocation,Navigate} from 'react-router-dom';

import clienteAxios from  '../config/axios';

export const useForm = (initialForm, validateForm) =>{

//usar navigate para redireccionar
let navigate = useNavigate();


    const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({});
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState(null);
 // Imprime 'null'
    

 window.history.replaceState(null, null, '/login');
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
      
       
    } 
    
    const handleBlur = (e) =>{
       handleChange(e);

    };
    
    const handleSubmit = (e) =>{
        setErrors(validateForm(form));
        e.preventDefault();
        
        
        if(Object.keys(errors).length === 0){
            
            clienteAxios.post('/users/login',form)
            .then(({data})=>{
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido De Vuelta!',
                    text: form.id_correo,
                  
                  });
                    if(data.rol ==="P"){

                        navigate('/panel', { state: {user:{id_correo:form.id_correo,rol:data.rol, token:data.token}} });
                    }else if(data.rol ==="A"){
                        navigate('/panelAdmin', { state: {user:{id_correo:form.id_correo,rol:data.rol, token:data.token}} });
                        
                    }else if(data.rol ==="M"){
                        navigate('/panelProfesional', { state: {user:{id_correo:form.id_correo,rol:data.rol, token:data.token}} });
                    }
                    
                    
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

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    }

    
} 