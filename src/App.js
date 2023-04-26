import React, {Fragment} from "react";

//layouts
import Login  from "./components/formularios/login";
import Home from './components/home/home';
import Perfil from './components/cliente/Perfil';
import PanelAdmin from "./components/Admin/PanelAdmin";
import AdminAProfesional from "./components/Admin/AdminAProfesional";
import Contrasenia from "./components/cliente/Contrasenia";
import NuevaCita from "./components/Admin/CrearCita";
import Citas from "./components/cliente/Citas";
import AdminAPaciente from "./components/Admin/AdminAPaciente";
import Historial from "./components/cliente/Historial";             
import ConfirmacionCita from "./components/cliente/ConfirmacionCita";             
import BaseCliente from "./components/cliente/BaseCliente";             
import PanelCliente from "./components/cliente/PanelCliente";             
import BaseAdmin from "./components/Admin/BaseAdmin";             
import CancelarCitas from "./components/cliente/CancelarCita";             
import ConfirmacionCitaCancelada from "./components/cliente/confirmacionCitaCancelada";             
import BaseProfesional from "./components/Profesional/BaseProfesional";             
import PanelProfesional from "./components/Profesional/PanelProfesional";             
import GestionarUsuarios from "./components/Admin/GestionarUsuarios";             
import AdminEstados from "./components/Admin/AdminEstados";
import AdminEstadosCitas from "./components/Admin/AdminEstadosCitas";
import NuevohistorialClinico from "./components/Profesional/NuevoHistorialClinico";
import HistorialClinico from "./components/Profesional/HistorialClinico";
import NuevaNota from "./components/Profesional/NuevaNota";
import Notas from "./components/Profesional/Notas";
import CitasProgramadas from "./components/Profesional/GestionarCitasMedico";
          
// Router
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    HashRouter
  } from "react-router-dom";
   

function App(){
  

  return(
    
<HashRouter>
    
      <Routes>
              
            <Route index element={<><Home/></>} />
            <Route path="login" element={<><Login/></>} />  


            {/* ADMIN */}


                  
                  <Route path="/panelAdmin" element={<><BaseAdmin titulo="¿Que quieres hacer?" contenido={<PanelAdmin/>}/> </>} />   
                  <Route path="/nuevoProfesional" element={<><BaseAdmin titulo="Nueva Medico" contenido={<AdminAProfesional/>}/> </>} />   
                  <Route path="/nuevoPaciente"  element={<><BaseAdmin titulo="Nuevo Paciente" contenido={<AdminAPaciente/>}/> </>}/>   
                  <Route path="/nuevaCita" element={<><BaseAdmin titulo="Nueva Cita" contenido={<NuevaCita/>}/> </>}/>   
                  <Route path="/GestionarUsuarios" element={<><BaseAdmin titulo="Gestionar Usuarios" contenido={<GestionarUsuarios/>}/> </>}/>   
                  <Route path="/panelEstados" element={<><BaseAdmin titulo="Gestionar Estados" contenido={<AdminEstados/>}/> </>}/>   
                  <Route path="/panelEstadosCitas" element={<><BaseAdmin titulo="Administrar Citas" contenido={<AdminEstadosCitas/>}/> </>}/>   
                  


            {/* PROFESIONAL */}
                  <Route path="/panelProfesional" element={<><BaseProfesional titulo="¿Que quieres hacer?" contenido={<PanelProfesional/>}/> </> }/>   
                  <Route path="/nuevoHistorialClinico" element={<><BaseProfesional titulo="Crea un Historial" contenido={<NuevohistorialClinico/>}/> </> }/>   
                  <Route path="/historialClinico" element={<><BaseProfesional titulo="Historial Clinico" contenido={<HistorialClinico/>}/> </> }/>   
                  <Route path="/nuevaNota" element={<><BaseProfesional titulo="Nueva Nota" contenido={<NuevaNota/>}/> </> }/>   
                  <Route path="/notas" element={<><BaseProfesional titulo="Buscar Nota" contenido={<Notas/>}/> </> }/>   
                  <Route path="/administrarCitas" element={<><BaseProfesional titulo="Administrar Citas" contenido={<AdminEstadosCitas/>}/> </> }/>
                  <Route path="/citasProgramadas" element={<><BaseProfesional titulo="Citas" contenido={<CitasProgramadas/>}/> </> }/>   
            {/* CLIENTE */}
          
                  <Route path="/panel" element={<><BaseCliente titulo="¿Que quieres hacer?" contenido={<PanelCliente/>} /></>} />   
                  <Route path="/perfil/:id" element={<><BaseCliente titulo="Actualizar Datos" contenido={<Perfil/>} /></>} />   
                  <Route path="/contrasenia/:id" element={<><BaseCliente titulo="Cambiar contraseña" contenido={<Contrasenia/>} /></>} />   
                  <Route path="/citas" element={<><BaseCliente titulo="Agrega una Cita" contenido={<Citas/>} /></>} />   
                  <Route path="/historial" element={<><BaseCliente titulo="Historial de Citas" contenido={<Historial/>} /></>} />   
                  <Route path="/confirmacionCita" element={<><BaseCliente titulo="" contenido={<ConfirmacionCita/>} /></>} />   
                  <Route path="/confirmacionCitaCancelada" element={<><BaseCliente titulo="" contenido={<ConfirmacionCitaCancelada/>} /></>} />   
                  <Route path="/cancelarCitas" element={<><BaseCliente titulo="Cancelar Cita" contenido={<CancelarCitas/>} /></>} />   
                
                        
           
            
            <Route path="*" element={<>
            <section>
              Pagina no existe ahhh :c
            </section></>}/>
      
      </Routes>

</HashRouter>
  )
}
export default App;
