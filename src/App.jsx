
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangedPassword';
import StartProjectView from './components/StartProjectView';
import VistaGenerada from './components/VistaGenerada';
import SalaColaborativa from './components/SalaColaborativa';
import Prueba from './components/prueba';
import VisorDiagramas from './components/VisorDiagramas';
import GenerarAngular from './components/GenerarAngular';
import ListaUsuarios from './components/ListUser';
import ConfigurarSala from './components/ConfigurarSala';
import LogsView from './components/LogsView';
import GuardarProyecto from './components/GuardarProyecto';
import MisProyectos from './components/MisProyectos';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/password" element={<ChangePassword />} />
        <Route path="/diagrams/view" element={<StartProjectView />} />
        <Route path="/vista-generada" element={<VistaGenerada />} />
        <Route path="/sala/:roomId" element={< SalaColaborativa/>}/>
        <Route path="/diagrams/createlienzo" element={< Prueba/>}/>
        <Route path="/diagrams/createlienzo/:roomId" element={<Prueba />} />
        <Route path="/diagrams/createimage" element={<StartProjectView />} />
        <Route path="/diagrams/creatediagram" element={< VisorDiagramas/>}/>
        <Route path="/generar-angular" element={<GenerarAngular />} />
        <Route path="/users" element={<ListaUsuarios/>} />
        <Route path="/diagrams/configurar-sala/:roomId" element={<ConfigurarSala />} />
        <Route path="/logs" element={<LogsView />} />
        <Route path="/guardar-proyecto" element={<GuardarProyecto />} />
        <Route path="/diagrams/mis-proyectos" element={<MisProyectos />} />





        

      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import GrapesJSComponent from './components/GrapesJSComponent'; // Importar el componente

// function App() {
//   return (
//     <div>
//       <h1>Mi Proyecto con GrapesJS</h1>
//       <GrapesJSComponent /> {/* Aquí se renderiza GrapesJS */}
//     </div>
//   );
// }

// export default App;
